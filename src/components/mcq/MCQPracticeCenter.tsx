import React, { useState } from 'react';
import {
  allQuestions,
  topicCategories,
  sampleExamQuestions,
  generatePracticeSet,
  getQuestionsByTopic,
  getQuestionsByDay,
} from '../../data/questions';
import {
  MCQQuestion,
  PracticeMode,
  UserStats,
  ExamSessionResult,
  Difficulty,
} from '../../types';
import { ExamSession } from './ExamSession';
import {
  calculatePerformanceAnalytics,
  recordExamSession,
} from '../../services/storage';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Shuffle,
  AlertTriangle,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Sliders,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface MCQPracticeCenterProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onNavigateToLesson: (lessonId: string) => void;
  onOpenAudit: () => void;
}

export const MCQPracticeCenter: React.FC<MCQPracticeCenterProps> = ({
  stats,
  onUpdateStats,
  onNavigateToLesson,
  onOpenAudit,
}) => {
  const [activeModeTab, setActiveModeTab] = useState<PracticeMode>('topic');

  // Active session state
  const [activeSession, setActiveSession] = useState<{
    questions: MCQQuestion[];
    mode: PracticeMode;
    modeTitle: string;
    timeLimitMinutes: number | null;
    passingScore: number;
    immediateFeedback: boolean;
  } | null>(null);

  // Settings for Exam mode
  const [examTimeLimit, setExamTimeLimit] = useState<number | null>(45); // default 45 mins
  const [examPassThreshold, setExamPassThreshold] = useState<number>(70); // default 70%

  // Settings for Random Set generator
  const [randomCount, setRandomCount] = useState<number>(10);
  const [randomDifficulty, setRandomDifficulty] = useState<Difficulty | 'all'>('all');
  const [randomTopic, setRandomTopic] = useState<string>('all');
  const [randomFilter, setRandomFilter] = useState<'all' | 'incorrect' | 'unattempted'>('all');
  const [randomShuffledOptions, setRandomShuffledOptions] = useState<boolean>(true);

  // Practice instant feedback toggle
  const [practiceFeedbackMode, setPracticeFeedbackMode] = useState<'instant' | 'examStyle'>('instant');

  // Compute analytics
  const analytics = calculatePerformanceAnalytics(stats);

  // Handlers to start sessions
  const handleStartExam = () => {
    const examQuestions = sampleExamQuestions(50, true);
    setActiveSession({
      questions: examQuestions,
      mode: 'exam',
      modeTitle: 'Full Course 50-Question Examination',
      timeLimitMinutes: examTimeLimit,
      passingScore: examPassThreshold,
      immediateFeedback: false, // Withhold until submission
    });
  };

  const handleStartTopicPractice = (topicName: string) => {
    const qList = getQuestionsByTopic(topicName);
    setActiveSession({
      questions: qList,
      mode: 'topic',
      modeTitle: `Topic Practice: ${topicName}`,
      timeLimitMinutes: null,
      passingScore: 70,
      immediateFeedback: practiceFeedbackMode === 'instant',
    });
  };

  const handleStartDailyPractice = (day: number) => {
    const qList = getQuestionsByDay(day);
    setActiveSession({
      questions: qList.slice(0, 10),
      mode: 'daily',
      modeTitle: `Day ${day} Daily Drill (10 Questions)`,
      timeLimitMinutes: null,
      passingScore: 70,
      immediateFeedback: practiceFeedbackMode === 'instant',
    });
  };

  const handleStartRandomSet = () => {
    const attemptedSet = new Set(Object.keys(stats.questionAttempts));
    const incorrectSet = new Set(analytics.incorrectQuestionIds);

    const questions = generatePracticeSet({
      category: randomTopic,
      difficulty: randomDifficulty,
      count: randomCount,
      filterMode: randomFilter,
      attemptedQuestionIds: attemptedSet,
      incorrectQuestionIds: incorrectSet,
      randomizeOptions: randomShuffledOptions,
    });

    if (questions.length === 0) {
      alert('No questions match the selected filter criteria. Try expanding your filters.');
      return;
    }

    setActiveSession({
      questions,
      mode: 'random',
      modeTitle: `Custom Drill (${questions.length} Questions)`,
      timeLimitMinutes: null,
      passingScore: 70,
      immediateFeedback: practiceFeedbackMode === 'instant',
    });
  };

  const handleStartWeaknessDrill = () => {
    const missedQuestions = allQuestions.filter((q) =>
      analytics.incorrectQuestionIds.includes(q.id)
    );

    if (missedQuestions.length === 0) {
      alert('Great news! You currently have zero recorded mistakes. Keep practicing to maintain your streak!');
      return;
    }

    setActiveSession({
      questions: missedQuestions.slice(0, 15),
      mode: 'weakness',
      modeTitle: `Weak-Topic Revision (${Math.min(missedQuestions.length, 15)} Questions)`,
      timeLimitMinutes: null,
      passingScore: 70,
      immediateFeedback: true,
    });
  };

  const handleSessionComplete = (result: ExamSessionResult) => {
    const updated = recordExamSession(result);
    onUpdateStats(updated);
  };

  // If a session is active, render ExamSession
  if (activeSession) {
    return (
      <ExamSession
        questions={activeSession.questions}
        mode={activeSession.mode}
        modeTitle={activeSession.modeTitle}
        timeLimitMinutes={activeSession.timeLimitMinutes}
        passingScore={activeSession.passingScore}
        immediateFeedback={activeSession.immediateFeedback}
        onComplete={handleSessionComplete}
        onExit={() => setActiveSession(null)}
        onNavigateToLesson={onNavigateToLesson}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Hero Overview */}
      <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#35F2C0] uppercase tracking-wider">
                Comprehensive Assessment Engine
              </span>
              <span className="text-xs text-[#64748B]">·</span>
              <span className="text-xs text-[#A3ADBA] font-mono">105 Original Validated MCQs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
              MCQ Practice Center & Examination System
            </h1>
            <p className="text-sm text-[#A3ADBA] leading-relaxed">
              Strengthen conceptual understanding, prepare for certifications, diagnose weak areas,
              and test code prediction across all 10 days of the HTML & CSS curriculum.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={handleStartExam}
              className="flex items-center gap-2 px-5 py-3 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-xl text-sm font-bold shadow-lg shadow-[#35F2C0]/10 transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Launch 50-Q Exam</span>
            </button>
            <button
              onClick={onOpenAudit}
              className="px-4 py-3 bg-[#101722] hover:bg-[#1A2737] text-[#A3ADBA] hover:text-[#35F2C0] border border-[#223044] rounded-xl text-xs font-mono font-semibold transition-colors"
            >
              Quality Audit
            </button>
          </div>
        </div>

        {/* Real User Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#223044]">
          <div className="bg-[#101722] border border-[#223044] p-3 rounded-xl">
            <span className="text-xs text-[#A3ADBA] block mb-1">Attempted Questions</span>
            <span className="text-xl font-mono font-bold text-[#F5F7FA]">
              {analytics.totalAttempted}{' '}
              <span className="text-xs text-[#A3ADBA] font-normal">/ {allQuestions.length}</span>
            </span>
          </div>

          <div className="bg-[#101722] border border-[#223044] p-3 rounded-xl">
            <span className="text-xs text-[#A3ADBA] block mb-1">Overall Accuracy</span>
            <span className="text-xl font-mono font-bold text-[#35F2C0]">
              {analytics.overallAccuracy}%
            </span>
          </div>

          <div className="bg-[#101722] border border-[#223044] p-3 rounded-xl">
            <span className="text-xs text-[#A3ADBA] block mb-1">Identified Weak Areas</span>
            <span className="text-xl font-mono font-bold text-red-400">
              {analytics.weakTopics.length} Topics
            </span>
          </div>

          <div className="bg-[#101722] border border-[#223044] p-3 rounded-xl">
            <span className="text-xs text-[#A3ADBA] block mb-1">Exam History</span>
            <span className="text-xl font-mono font-bold text-[#78A9FF]">
              {stats.examHistory.length} Sessions
            </span>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#101722] border border-[#223044] rounded-xl overflow-x-auto text-xs">
        {[
          { id: 'topic', label: '1. Topic-Wise Practice', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'daily', label: '2. Daily Practice (1-10)', icon: <Calendar className="w-4 h-4" /> },
          { id: 'exam', label: '3. Full 50-Q Examination', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'random', label: '4. Random Drill Generator', icon: <Shuffle className="w-4 h-4" /> },
          { id: 'weakness', label: '5. Weak-Topic Revision', icon: <AlertTriangle className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeModeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveModeTab(tab.id as PracticeMode)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#151F2C] text-[#35F2C0] font-bold shadow-sm border border-[#35F2C0]/40'
                  : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* -------------------------------------------------------- */}
      {/* MODE 1: TOPIC-WISE PRACTICE */}
      {/* -------------------------------------------------------- */}
      {activeModeTab === 'topic' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#F5F7FA]">Curriculum Topic Drills</h2>
              <p className="text-xs text-[#A3ADBA]">
                Select any of the 11 course subjects to begin targeted question practice
              </p>
            </div>
            {/* Instant Feedback Toggle */}
            <div className="flex items-center gap-2 text-xs bg-[#151F2C] border border-[#223044] p-1.5 rounded-lg">
              <span className="text-[#A3ADBA] pl-1.5">Feedback:</span>
              <button
                onClick={() => setPracticeFeedbackMode('instant')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  practiceFeedbackMode === 'instant'
                    ? 'bg-[#35F2C0] text-[#080C12] font-bold'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                Immediate
              </button>
              <button
                onClick={() => setPracticeFeedbackMode('examStyle')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  practiceFeedbackMode === 'examStyle'
                    ? 'bg-[#35F2C0] text-[#080C12] font-bold'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                At End
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicCategories.map((cat, idx) => {
              const topicData = analytics.topicStats[cat.name] || {
                total: cat.count,
                attempted: 0,
                correct: 0,
                percentage: 0,
              };

              return (
                <div
                  key={cat.name}
                  className="bg-[#151F2C] border border-[#223044] hover:border-[#35F2C0]/50 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#A3ADBA]">
                      <span className="font-mono">Day {cat.day}</span>
                      <span className="font-mono">{cat.count} Questions</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#F5F7FA] leading-snug group-hover:text-[#35F2C0] transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#223044]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A3ADBA]">
                        Accuracy ({topicData.correct}/{topicData.attempted})
                      </span>
                      <span className="font-mono font-bold text-[#F5F7FA]">
                        {topicData.attempted > 0 ? `${topicData.percentage}%` : 'Unattempted'}
                      </span>
                    </div>

                    <div className="w-full bg-[#101722] h-1.5 rounded-full overflow-hidden border border-[#223044]">
                      <div
                        className="bg-[#35F2C0] h-full rounded-full transition-all"
                        style={{ width: `${topicData.percentage}%` }}
                      />
                    </div>

                    <button
                      onClick={() => handleStartTopicPractice(cat.name)}
                      className="w-full py-2 bg-[#101722] group-hover:bg-[#35F2C0] text-[#F5F7FA] group-hover:text-[#080C12] rounded-lg text-xs font-bold border border-[#223044] group-hover:border-[#35F2C0] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Practice</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODE 2: DAILY PRACTICE */}
      {/* -------------------------------------------------------- */}
      {activeModeTab === 'daily' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#F5F7FA]">Daily Curriculum Drills</h2>
            <p className="text-xs text-[#A3ADBA]">
              10 structured questions matched directly to each day\'s lesson objectives
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dayNum) => {
              const dayQuestions = getQuestionsByDay(dayNum);
              const isCompleted = stats.dailyPracticeCompleted[dayNum];

              return (
                <div
                  key={dayNum}
                  className="bg-[#151F2C] border border-[#223044] rounded-xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#35F2C0]">DAY {dayNum}</span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#35F2C0]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#223044]" />
                    )}
                  </div>

                  <div className="text-xs text-[#CBD5E1]">
                    {dayQuestions.length} Questions Available
                  </div>

                  <button
                    onClick={() => handleStartDailyPractice(dayNum)}
                    className="w-full py-2 bg-[#101722] hover:bg-[#35F2C0] text-[#F5F7FA] hover:text-[#080C12] rounded-lg text-xs font-bold border border-[#223044] hover:border-[#35F2C0] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Practice Day {dayNum}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODE 3: FULL COURSE 50-QUESTION EXAMINATION */}
      {/* -------------------------------------------------------- */}
      {activeModeTab === 'exam' && (
        <div className="max-w-2xl mx-auto bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#35F2C0] uppercase">
              Formal Certification Simulator
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F5F7FA]">
              Full 50-Question Examination
            </h2>
            <p className="text-xs text-[#A3ADBA] leading-relaxed">
              Samples questions across all 10 days of the curriculum. Answers and explanations are
              withheld until final submission. Supports timer, flagging, and a review screen.
            </p>
          </div>

          {/* Configurable Parameters */}
          <div className="space-y-4 pt-4 border-t border-[#223044]">
            {/* Time Limit Setting */}
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#F5F7FA] block">Time Limit</span>
                <span className="text-[#A3ADBA]">Set countdown timer for the exam</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-[#101722] border border-[#223044] rounded-lg">
                {[30, 45, 60, null].map((val, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExamTimeLimit(val)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      examTimeLimit === val
                        ? 'bg-[#35F2C0] text-[#080C12] font-bold'
                        : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                    }`}
                  >
                    {val === null ? 'Untimed' : `${val}m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Passing Score Threshold Setting */}
            <div className="flex items-center justify-between text-xs pt-2">
              <div>
                <span className="font-semibold text-[#F5F7FA] block">Passing Score Threshold</span>
                <span className="text-[#A3ADBA]">Standard default is 70%</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-[#101722] border border-[#223044] rounded-lg">
                {[60, 70, 80].map((threshold) => (
                  <button
                    key={threshold}
                    onClick={() => setExamPassThreshold(threshold)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      examPassThreshold === threshold
                        ? 'bg-[#35F2C0] text-[#080C12] font-bold'
                        : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                    }`}
                  >
                    {threshold}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full py-3.5 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-xl text-sm font-bold shadow-lg shadow-[#35F2C0]/10 transition-all flex items-center justify-center gap-2"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Begin 50-Question Examination</span>
          </button>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODE 4: RANDOM DRILL GENERATOR */}
      {/* -------------------------------------------------------- */}
      {activeModeTab === 'random' && (
        <div className="max-w-2xl mx-auto bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#F5F7FA]">Custom Practice Generator</h2>
            <p className="text-xs text-[#A3ADBA]">
              Assemble custom drills with filters, difficulty selection, and option shuffling
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Topic Filter */}
            <div>
              <label className="text-[#A3ADBA] block mb-1.5 font-semibold">Topic Selection</label>
              <select
                value={randomTopic}
                onChange={(e) => setRandomTopic(e.target.value)}
                className="w-full p-2.5 bg-[#101722] border border-[#223044] rounded-lg text-[#F5F7FA] outline-none"
              >
                <option value="all">All Topics (Comprehensive Mixture)</option>
                {topicCategories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="text-[#A3ADBA] block mb-1.5 font-semibold">Difficulty Level</label>
              <div className="grid grid-cols-4 gap-2">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setRandomDifficulty(diff)}
                    className={`py-2 rounded-lg border text-xs capitalize transition-colors ${
                      randomDifficulty === diff
                        ? 'bg-[#35F2C0] text-[#080C12] border-[#35F2C0] font-bold'
                        : 'bg-[#101722] text-[#A3ADBA] border-[#223044] hover:text-[#F5F7FA]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <label className="text-[#A3ADBA] block mb-1.5 font-semibold">Number of Questions</label>
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 15, 20, 25].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setRandomCount(cnt)}
                    className={`py-2 rounded-lg border text-xs font-mono transition-colors ${
                      randomCount === cnt
                        ? 'bg-[#35F2C0] text-[#080C12] border-[#35F2C0] font-bold'
                        : 'bg-[#101722] text-[#A3ADBA] border-[#223044] hover:text-[#F5F7FA]'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* History Filter */}
            <div>
              <label className="text-[#A3ADBA] block mb-1.5 font-semibold">Question Pool</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all', label: 'All Questions' },
                  { id: 'incorrect', label: 'Previously Missed' },
                  { id: 'unattempted', label: 'Unattempted Only' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRandomFilter(item.id as any)}
                    className={`py-2 px-2 rounded-lg border text-xs transition-colors ${
                      randomFilter === item.id
                        ? 'bg-[#35F2C0] text-[#080C12] border-[#35F2C0] font-bold'
                        : 'bg-[#101722] text-[#A3ADBA] border-[#223044] hover:text-[#F5F7FA]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shuffling toggle */}
            <div className="flex items-center justify-between p-3 bg-[#101722] border border-[#223044] rounded-lg">
              <span className="text-[#F5F7FA]">Randomize Answer Option Order (A,B,C,D)</span>
              <input
                type="checkbox"
                checked={randomShuffledOptions}
                onChange={(e) => setRandomShuffledOptions(e.target.checked)}
                className="w-4 h-4 accent-[#35F2C0]"
              />
            </div>
          </div>

          <button
            onClick={handleStartRandomSet}
            className="w-full py-3 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            <span>Generate & Start Practice Set</span>
          </button>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODE 5: WEAK-TOPIC REVISION */}
      {/* -------------------------------------------------------- */}
      {activeModeTab === 'weakness' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#F5F7FA]">Targeted Weak-Topic Revision</h2>
                <p className="text-xs text-[#A3ADBA]">
                  Curated exercises based on past incorrect answers
                </p>
              </div>
            </div>

            <p className="text-sm text-[#CBD5E1]">
              The revision engine identifies concepts where your accuracy falls below 65% or where
              repeated mistakes occurred. Answering questions correctly in revision drills restores
              your topic mastery.
            </p>

            <div className="pt-2">
              <button
                onClick={handleStartWeaknessDrill}
                disabled={analytics.incorrectQuestionIds.length === 0}
                className="px-6 py-2.5 bg-[#35F2C0] hover:bg-[#2dd4a8] disabled:opacity-40 text-[#080C12] rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>
                  Start Revision Drill ({analytics.incorrectQuestionIds.length} Missed Questions)
                </span>
              </button>
            </div>
          </div>

          {/* Weak Topics List */}
          {analytics.weakTopics.length > 0 && (
            <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#F5F7FA]">Identified Topics Needing Review</h3>
              <div className="space-y-3">
                {analytics.weakTopics.map((topic) => (
                  <div
                    key={topic.name}
                    className="p-3 bg-[#101722] border border-red-900/40 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#F5F7FA]">{topic.name}</div>
                      <div className="text-[#A3ADBA] mt-0.5">
                        Accuracy: {topic.percentage}% ({topic.correct}/{topic.attempted} correct)
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartTopicPractice(topic.name)}
                      className="px-3 py-1.5 bg-[#151F2C] hover:bg-[#35F2C0] text-[#CBD5E1] hover:text-[#080C12] border border-[#223044] hover:border-[#35F2C0] rounded-md font-semibold transition-all"
                    >
                      Drill Topic
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
