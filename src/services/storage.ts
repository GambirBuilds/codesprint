import { UserStats, QuestionAttempt, ExamSessionResult, OptionId, PracticeMode } from '../types';
import { allQuestions } from '../data/questions';

const STORAGE_KEY = 'codesprint_academy_v1_state';

const initialStats: UserStats = {
  xp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  bookmarkedQuestionIds: [],
  unlockedBadges: ['welcome-sprint'],
  questionAttempts: {},
  examHistory: [],
  dailyPracticeCompleted: {},
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...initialStats };
    const parsed = JSON.parse(raw);
    return {
      ...initialStats,
      ...parsed,
      questionAttempts: parsed.questionAttempts || {},
      examHistory: parsed.examHistory || [],
      bookmarkedQuestionIds: parsed.bookmarkedQuestionIds || [],
      completedLessons: parsed.completedLessons || [],
      unlockedBadges: parsed.unlockedBadges || ['welcome-sprint'],
      dailyPracticeCompleted: parsed.dailyPracticeCompleted || {},
    };
  } catch (err) {
    console.error('Failed to load storage, returning fresh state:', err);
    return { ...initialStats };
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * Record a question attempt in practice mode
 */
export function recordQuestionAttempt(
  questionId: string,
  selectedAnswer: OptionId | null,
  isCorrect: boolean,
  mode: PracticeMode,
  timeSpentSeconds = 0
): UserStats {
  const stats = loadUserStats();
  const existing = stats.questionAttempts[questionId];

  // Award XP only if first time answering correctly
  let xpEarned = 0;
  if (isCorrect && (!existing || !existing.isCorrect)) {
    xpEarned = 15;
  }

  // Update streak if active on a new calendar day
  const today = new Date().toISOString().split('T')[0];
  let newStreak = stats.streakDays;
  if (stats.lastActiveDate !== today) {
    const lastDate = new Date(stats.lastActiveDate);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const updatedAttempt: QuestionAttempt = {
    questionId,
    selectedAnswer,
    isCorrect,
    timeSpentSeconds,
    timestamp: Date.now(),
    mode,
  };

  const updatedAttempts = {
    ...stats.questionAttempts,
    [questionId]: updatedAttempt,
  };

  // Check badges
  const badges = new Set(stats.unlockedBadges);
  const correctCount = Object.values(updatedAttempts).filter((a) => a.isCorrect).length;
  if (correctCount >= 10) badges.add('first-10-correct');
  if (correctCount >= 50) badges.add('half-century');
  if (correctCount >= 100) badges.add('master-100');
  if (newStreak >= 3) badges.add('streak-3-days');

  const updatedStats: UserStats = {
    ...stats,
    xp: stats.xp + xpEarned,
    streakDays: newStreak,
    lastActiveDate: today,
    questionAttempts: updatedAttempts,
    unlockedBadges: Array.from(badges),
  };

  saveUserStats(updatedStats);
  return updatedStats;
}

/**
 * Record a completed exam session
 */
export function recordExamSession(result: ExamSessionResult): UserStats {
  const stats = loadUserStats();

  let xpEarned = 50; // Participation XP
  if (result.passed) {
    xpEarned += 150; // Passed exam XP
  }
  if (result.scorePercentage === 100) {
    xpEarned += 200; // Perfect score bonus
  }

  // Mark all correct question attempts from this exam
  const updatedAttempts = { ...stats.questionAttempts };
  for (const qId of result.questionIds) {
    const userAns = result.userAnswers[qId];
    const qObj = allQuestions.find((q) => q.id === qId);
    if (qObj && userAns) {
      const isCorrect = userAns === qObj.correctAnswer;
      updatedAttempts[qId] = {
        questionId: qId,
        selectedAnswer: userAns,
        isCorrect,
        timeSpentSeconds: Math.round(result.timeSpentSeconds / result.totalQuestions),
        timestamp: Date.now(),
        mode: result.mode,
      };
    }
  }

  const badges = new Set(stats.unlockedBadges);
  if (result.passed) badges.add('exam-passed');
  if (result.scorePercentage >= 90) badges.add('exam-honor-roll');

  const updatedStats: UserStats = {
    ...stats,
    xp: stats.xp + xpEarned,
    examHistory: [result, ...stats.examHistory.slice(0, 49)], // keep last 50
    questionAttempts: updatedAttempts,
    unlockedBadges: Array.from(badges),
  };

  saveUserStats(updatedStats);
  return updatedStats;
}

/**
 * Toggle bookmark state for a question
 */
export function toggleBookmarkQuestion(questionId: string): boolean {
  const stats = loadUserStats();
  const index = stats.bookmarkedQuestionIds.indexOf(questionId);
  let isBookmarked = false;
  let newBookmarks: string[];

  if (index >= 0) {
    newBookmarks = stats.bookmarkedQuestionIds.filter((id) => id !== questionId);
    isBookmarked = false;
  } else {
    newBookmarks = [...stats.bookmarkedQuestionIds, questionId];
    isBookmarked = true;
  }

  saveUserStats({
    ...stats,
    bookmarkedQuestionIds: newBookmarks,
  });

  return isBookmarked;
}

/**
 * Compute performance analytics from user history
 */
export function calculatePerformanceAnalytics(stats: UserStats) {
  const attempts = Object.values(stats.questionAttempts);
  const totalAttempted = attempts.length;
  const totalCorrect = attempts.filter((a) => a.isCorrect).length;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Breakdown by category
  const topicStats: Record<string, { total: number; attempted: number; correct: number; percentage: number }> = {};
  
  allQuestions.forEach((q) => {
    if (!topicStats[q.topicCategory]) {
      topicStats[q.topicCategory] = { total: 0, attempted: 0, correct: 0, percentage: 0 };
    }
    topicStats[q.topicCategory].total += 1;
    const attempt = stats.questionAttempts[q.id];
    if (attempt) {
      topicStats[q.topicCategory].attempted += 1;
      if (attempt.isCorrect) {
        topicStats[q.topicCategory].correct += 1;
      }
    }
  });

  Object.keys(topicStats).forEach((topic) => {
    const item = topicStats[topic];
    item.percentage = item.attempted > 0 ? Math.round((item.correct / item.attempted) * 100) : 0;
  });

  // Weak topics (attempted with accuracy < 65% or 2+ mistakes)
  const weakTopics = Object.entries(topicStats)
    .filter(([_, data]) => data.attempted >= 2 && data.percentage < 65)
    .map(([name, data]) => ({ name, ...data }));

  // Incorrect question IDs that learner can review
  const incorrectQuestionIds = attempts.filter((a) => !a.isCorrect).map((a) => a.questionId);

  return {
    totalAttempted,
    totalCorrect,
    overallAccuracy,
    topicStats,
    weakTopics,
    incorrectQuestionIds,
  };
}

/**
 * Reset all user progress
 */
export function resetUserProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset storage:', err);
  }
}

/**
 * Export progress data as JSON download
 */
export function exportProgressAsJson(): string {
  const stats = loadUserStats();
  return JSON.stringify(stats, null, 2);
}

/**
 * Import progress JSON with validation
 */
export function importProgressFromJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed !== 'object' || parsed === null) return false;
    const validated: UserStats = {
      ...initialStats,
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      streakDays: typeof parsed.streakDays === 'number' ? parsed.streakDays : 1,
      lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0],
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      bookmarkedQuestionIds: Array.isArray(parsed.bookmarkedQuestionIds) ? parsed.bookmarkedQuestionIds : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : ['welcome-sprint'],
      questionAttempts: typeof parsed.questionAttempts === 'object' ? parsed.questionAttempts : {},
      examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
      dailyPracticeCompleted: typeof parsed.dailyPracticeCompleted === 'object' ? parsed.dailyPracticeCompleted : {},
    };
    saveUserStats(validated);
    return true;
  } catch (err) {
    console.error('Failed to import user progress JSON:', err);
    return false;
  }
}
