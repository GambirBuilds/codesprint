import React, { useState, useEffect, useRef } from 'react';
import {
  MCQQuestion,
  OptionId,
  PracticeMode,
  ExamSessionResult,
  Difficulty,
} from '../../types';
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  BookOpen,
  RotateCcw,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ExamSessionProps {
  questions: MCQQuestion[];
  mode: PracticeMode;
  modeTitle: string;
  timeLimitMinutes?: number | null;
  passingScore?: number; // e.g. 70
  immediateFeedback?: boolean; // true for standard practice, false for official exam
  onComplete: (result: ExamSessionResult) => void;
  onExit: () => void;
  onNavigateToLesson?: (lessonId: string) => void;
}

export const ExamSession: React.FC<ExamSessionProps> = ({
  questions,
  mode,
  modeTitle,
  timeLimitMinutes = null,
  passingScore = 70,
  immediateFeedback = false,
  onComplete,
  onExit,
  onNavigateToLesson,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, OptionId | null>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [revealedInPractice, setRevealedInPractice] = useState<Record<string, boolean>>({});
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [examResult, setExamResult] = useState<ExamSessionResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'missed' | 'flagged'>('all');

  // Timer state
  const totalSeconds = timeLimitMinutes ? timeLimitMinutes * 60 : null;
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(totalSeconds);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const timerRef = useRef<any>(null);

  const currentQ = questions[currentIndex];
  const isAnswered = currentQ ? !!userAnswers[currentQ.id] : false;
  const isFlagged = currentQ ? flaggedIds.has(currentQ.id) : false;
  const isPracticeMode = immediateFeedback;

  // Track timer
  useEffect(() => {
    if (isCompleted) return;

    timerRef.current = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);
      if (secondsRemaining !== null) {
        setSecondsRemaining((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [secondsRemaining, isCompleted]);

  // Keyboard navigation & option selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showReviewScreen || showConfirmModal || isCompleted) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key) && currentQ) {
        handleSelectOption(key as OptionId);
      } else if (['1', '2', '3', '4'].includes(key) && currentQ) {
        const map: Record<string, OptionId> = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelectOption(map[key]);
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (e.key.toLowerCase() === 'f' && currentQ) {
        toggleFlag(currentQ.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, userAnswers, showReviewScreen, showConfirmModal, isCompleted]);

  const handleSelectOption = (optId: OptionId) => {
    if (!currentQ) return;
    // In practice mode with immediate feedback, allow changing before reveal or allow reveal
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optId,
    }));

    if (isPracticeMode) {
      setRevealedInPractice((prev) => ({
        ...prev,
        [currentQ.id]: true,
      }));
    }
  };

  const toggleFlag = (id: string) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleHint = (id: string) => {
    setShowHint((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Submit assessment calculations
  const calculateFinalResults = (): ExamSessionResult => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    const topicBreakdown: Record<string, { total: number; correct: number }> = {};
    const difficultyBreakdown: Record<Difficulty, { total: number; correct: number }> = {
      beginner: { total: 0, correct: 0 },
      intermediate: { total: 0, correct: 0 },
      advanced: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      // topic
      if (!topicBreakdown[q.topicCategory]) {
        topicBreakdown[q.topicCategory] = { total: 0, correct: 0 };
      }
      topicBreakdown[q.topicCategory].total += 1;
      difficultyBreakdown[q.difficulty].total += 1;

      const userAns = userAnswers[q.id];
      if (!userAns) {
        unanswered += 1;
      } else if (userAns === q.correctAnswer) {
        correct += 1;
        topicBreakdown[q.topicCategory].correct += 1;
        difficultyBreakdown[q.difficulty].correct += 1;
      } else {
        incorrect += 1;
      }
    });

    // Precise formula: Percentage = (Correct answers / Total questions) * 100
    // Unanswered are in the denominator, not numerator
    const scorePercentage = Math.round((correct / questions.length) * 100);
    const passed = scorePercentage >= passingScore;

    const result: ExamSessionResult = {
      attemptId: 'exam-' + Date.now(),
      timestamp: Date.now(),
      mode,
      totalQuestions: questions.length,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      unansweredQuestions: unanswered,
      scorePercentage,
      passingScore,
      passed,
      timeSpentSeconds,
      timeLimitSeconds: totalSeconds,
      topicBreakdown,
      difficultyBreakdown,
      userAnswers,
      flaggedQuestionIds: Array.from(flaggedIds),
      questionIds: questions.map((q) => q.id),
    };

    return result;
  };

  const handleFinalSubmit = () => {
    clearInterval(timerRef.current);
    const result = calculateFinalResults();
    setExamResult(result);
    setIsCompleted(true);
    setShowConfirmModal(false);
    setShowReviewScreen(false);
    onComplete(result);
  };

  const handleAutoSubmit = () => {
    handleFinalSubmit();
  };

  const answeredCount = Object.values(userAnswers).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  // -------------------------------------------------------------
  // RENDER: RESULTS SCREEN (Section G)
  // -------------------------------------------------------------
  if (isCompleted && examResult) {
    const filteredReviewQuestions = questions.filter((q) => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;
      if (reviewFilter === 'missed') return !isCorrect;
      if (reviewFilter === 'flagged') return flaggedIds.has(q.id);
      return true;
    });

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        {/* Pass/Fail Banner */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border ${
            examResult.passed
              ? 'bg-[#151F2C] border-[#35F2C0]/40'
              : 'bg-[#151F2C] border-red-500/40'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {examResult.passed ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#35F2C0]/15 text-[#35F2C0] rounded-md font-semibold text-xs tracking-wider uppercase border border-[#35F2C0]/30">
                    <CheckCircle2 className="w-4 h-4" /> Passed Examination
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/15 text-red-400 rounded-md font-semibold text-xs tracking-wider uppercase border border-red-500/30">
                    <XCircle className="w-4 h-4" /> Did Not Meet Passing Standard
                  </div>
                )}
                <span className="text-xs text-[#A3ADBA]">
                  Passing threshold: {passingScore}%
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
                {examResult.passed
                  ? 'Congratulations! You Demonstrated Competency.'
                  : 'Practice Required to Reach Mastery.'}
              </h2>
              <p className="text-sm text-[#A3ADBA]">
                {examResult.passed
                  ? `You achieved ${examResult.scorePercentage}%, successfully clearing the ${passingScore}% requirement.`
                  : `Your final score was ${examResult.scorePercentage}%. Review missed questions below to address knowledge gaps.`}
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="flex sm:flex-col items-center justify-center p-4 bg-[#101722] border border-[#223044] rounded-xl shrink-0 text-center min-w-[140px]">
              <span className="text-4xl font-mono font-extrabold text-[#F5F7FA]">
                {examResult.scorePercentage}%
              </span>
              <span className="text-xs text-[#A3ADBA] mt-1 font-mono">
                {examResult.correctAnswers} / {examResult.totalQuestions} Correct
              </span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#223044] text-xs">
            <div>
              <span className="text-[#A3ADBA] block">Total Questions</span>
              <span className="text-base font-mono font-bold text-[#F5F7FA]">
                {examResult.totalQuestions}
              </span>
            </div>
            <div>
              <span className="text-[#A3ADBA] block">Correct Answers</span>
              <span className="text-base font-mono font-bold text-[#35F2C0]">
                {examResult.correctAnswers}
              </span>
            </div>
            <div>
              <span className="text-[#A3ADBA] block">Incorrect / Skipped</span>
              <span className="text-base font-mono font-bold text-red-400">
                {examResult.incorrectAnswers + examResult.unansweredQuestions}
              </span>
            </div>
            <div>
              <span className="text-[#A3ADBA] block">Time Spent</span>
              <span className="text-base font-mono font-bold text-[#78A9FF]">
                {formatTime(examResult.timeSpentSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Topic-Wise Breakdown */}
        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-6">
          <h3 className="text-base font-bold text-[#F5F7FA] mb-4">
            Performance Breakdown by Course Topic
          </h3>
          <div className="space-y-4">
            {Object.entries(examResult.topicBreakdown).map(([topic, data]) => {
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              const isPassing = pct >= passingScore;
              return (
                <div key={topic} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#CBD5E1] truncate pr-4">{topic}</span>
                    <span className="font-mono text-[#A3ADBA] shrink-0">
                      {data.correct}/{data.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#101722] h-2 rounded-full overflow-hidden border border-[#223044]">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isPassing ? 'bg-[#35F2C0]' : 'bg-red-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map((diff) => {
            const data = examResult.difficultyBreakdown[diff];
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            return (
              <div
                key={diff}
                className="bg-[#151F2C] border border-[#223044] rounded-xl p-4 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[#A3ADBA]">
                    {diff}
                  </span>
                  <span className="font-mono text-[#F5F7FA]">
                    {data.correct}/{data.total}
                  </span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5F7FA]">{pct}%</div>
              </div>
            );
          })}
        </div>

        {/* Question-By-Question Detailed Review */}
        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#223044] pb-4">
            <div>
              <h3 className="text-base font-bold text-[#F5F7FA]">
                Detailed Question Review ({filteredReviewQuestions.length})
              </h3>
              <p className="text-xs text-[#A3ADBA]">
                Review correct answers, explanations, and code rationales
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#101722] rounded-lg border border-[#223044] text-xs">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-[#151F2C] text-[#35F2C0] font-bold border border-[#35F2C0]/40'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setReviewFilter('missed')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  reviewFilter === 'missed'
                    ? 'bg-[#151F2C] text-red-400 font-bold border border-red-500/40'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                Missed ({examResult.incorrectAnswers + examResult.unansweredQuestions})
              </button>
              <button
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  reviewFilter === 'flagged'
                    ? 'bg-[#151F2C] text-[#FBBF24] font-bold border border-[#FBBF24]/40'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                Flagged ({examResult.flaggedQuestionIds.length})
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {filteredReviewQuestions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border space-y-4 ${
                    isCorrect
                      ? 'bg-[#101722] border-[#223044]'
                      : 'bg-[#101722] border-red-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#151F2C] text-[#A3ADBA] border border-[#223044]">
                        Q{questions.findIndex((item) => item.id === q.id) + 1} · {q.id}
                      </span>
                      <span className="text-xs text-[#A3ADBA]">Day {q.day}</span>
                      <span className="text-xs text-[#64748B]">·</span>
                      <span className="text-xs capitalize text-[#A3ADBA]">{q.difficulty}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs font-semibold text-[#35F2C0]">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-red-400">
                          <XCircle className="w-4 h-4" /> Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-medium text-[#F5F7FA]">{q.question}</p>

                  {q.code && (
                    <pre className="p-3 bg-[#080C12] rounded-lg border border-[#223044] text-xs font-mono text-[#78A9FF] overflow-x-auto whitespace-pre">
                      <code>{q.code}</code>
                    </pre>
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt) => {
                      const isSelected = userAns === opt.id;
                      const isTargetCorrect = q.correctAnswer === opt.id;
                      let optionClasses = 'bg-[#151F2C] border-[#223044] text-[#CBD5E1]';

                      if (isTargetCorrect) {
                        optionClasses = 'bg-[#35F2C0]/15 border-[#35F2C0] text-[#35F2C0] font-semibold';
                      } else if (isSelected && !isTargetCorrect) {
                        optionClasses = 'bg-red-950/40 border-red-500 text-red-300 font-semibold';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-2.5 rounded-lg border flex items-start gap-2 ${optionClasses}`}
                        >
                          <span className="font-mono font-bold shrink-0">{opt.id}.</span>
                          <span>{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  <div className="p-3.5 bg-[#151F2C] border border-[#223044] rounded-lg text-xs space-y-1.5">
                    <div className="font-semibold text-[#35F2C0] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Technical Explanation:
                    </div>
                    <p className="text-[#CBD5E1] leading-relaxed">{q.explanation}</p>
                    {onNavigateToLesson && q.lessonId && (
                      <div className="pt-2">
                        <button
                          onClick={() => onNavigateToLesson(q.lessonId)}
                          className="inline-flex items-center gap-1 text-[#78A9FF] hover:underline font-medium"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Study related lesson: {q.topic}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#223044]">
          <button
            onClick={onExit}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#151F2C] hover:bg-[#1A2737] text-[#F5F7FA] border border-[#223044] rounded-lg text-sm font-semibold transition-colors"
          >
            Return to Practice Center
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: REVIEW-BEFORE-SUBMISSION SCREEN (Section E.3)
  // -------------------------------------------------------------
  if (showReviewScreen) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#223044] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#F5F7FA]">Review Exam Before Final Submission</h2>
            <p className="text-xs text-[#A3ADBA]">
              Verify answered questions and flagged items before completing your attempt
            </p>
          </div>
          <button
            onClick={() => setShowReviewScreen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#151F2C] text-[#F5F7FA] border border-[#223044] rounded-md text-xs font-semibold hover:border-[#35F2C0]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Question
          </button>
        </div>

        {/* Status Counts */}
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="bg-[#151F2C] border border-[#223044] p-3 rounded-lg">
            <span className="text-[#A3ADBA] block">Answered</span>
            <span className="text-lg font-mono font-bold text-[#35F2C0]">{answeredCount}</span>
          </div>
          <div className="bg-[#151F2C] border border-[#223044] p-3 rounded-lg">
            <span className="text-[#A3ADBA] block">Flagged for Review</span>
            <span className="text-lg font-mono font-bold text-[#FBBF24]">
              {flaggedIds.size}
            </span>
          </div>
          <div className="bg-[#151F2C] border border-[#223044] p-3 rounded-lg">
            <span className="text-[#A3ADBA] block">Unanswered</span>
            <span className="text-lg font-mono font-bold text-red-400">{unansweredCount}</span>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#F5F7FA]">All Questions Navigation Grid</h3>
            <div className="flex items-center gap-3 text-[11px] text-[#A3ADBA]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#35F2C0]" /> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#FBBF24]" /> Flagged
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-[#223044]" /> Unanswered
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, idx) => {
              const isAns = !!userAnswers[q.id];
              const isFlg = flaggedIds.has(q.id);
              let btnClass = 'bg-[#101722] text-[#A3ADBA] border-[#223044]';

              if (isAns) {
                btnClass = 'bg-[#35F2C0]/15 text-[#35F2C0] border-[#35F2C0]/50 font-semibold';
              }
              if (isFlg) {
                btnClass = 'bg-[#FBBF24]/20 text-[#FBBF24] border-[#FBBF24] font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowReviewScreen(false);
                  }}
                  className={`p-2.5 rounded-lg border text-xs font-mono transition-colors text-center hover:scale-105 ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Warning & Action */}
        <div className="p-4 bg-[#101722] border border-[#223044] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-[#F5F7FA]">Ready to finalize submission?</div>
            <p className="text-xs text-[#A3ADBA]">
              {unansweredCount > 0
                ? `You still have ${unansweredCount} unanswered question(s). Unanswered questions count as 0%.`
                : 'All questions have been answered. You can proceed with scoring.'}
            </p>
          </div>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-6 py-2.5 bg-[#35F2C0] text-[#080C12] rounded-lg text-sm font-bold hover:bg-[#2dd4a8] transition-colors whitespace-nowrap shrink-0"
          >
            Submit Exam
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: STANDARD ACTIVE QUESTION VIEW
  // -------------------------------------------------------------
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const selectedOpt = currentQ ? userAnswers[currentQ.id] : null;
  const isRevealed = currentQ && isPracticeMode && revealedInPractice[currentQ.id];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4 border-b border-[#223044] pb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs text-[#A3ADBA] hover:text-[#F5F7FA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Practice
        </button>

        <div className="flex items-center gap-3">
          {/* Mode label */}
          <span className="text-xs font-mono text-[#35F2C0] bg-[#35F2C0]/10 px-2.5 py-1 rounded border border-[#35F2C0]/20 hidden sm:inline">
            {modeTitle}
          </span>

          {/* Timer Display */}
          {secondsRemaining !== null && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border ${
                secondsRemaining < 300
                  ? 'bg-red-950/40 border-red-500 text-red-300 animate-pulse'
                  : 'bg-[#151F2C] border-[#223044] text-[#78A9FF]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          )}

          {/* Flag button */}
          <button
            onClick={() => currentQ && toggleFlag(currentQ.id)}
            title="Flag question for review"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
              isFlagged
                ? 'bg-[#FBBF24]/15 border-[#FBBF24] text-[#FBBF24]'
                : 'bg-[#151F2C] border-[#223044] text-[#A3ADBA] hover:text-[#F5F7FA]'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">Flag</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#A3ADBA]">
          <span className="font-mono">
            Question <span className="text-[#F5F7FA] font-bold">{currentIndex + 1}</span> of{' '}
            {questions.length}
          </span>
          <span className="font-mono">{progressPercent}% complete</span>
        </div>
        <div className="w-full bg-[#101722] h-1.5 rounded-full overflow-hidden border border-[#223044]">
          <div
            className="bg-[#35F2C0] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Metadata badges (clean text separators as per design rules) */}
          <div className="flex items-center gap-2 text-xs text-[#A3ADBA]">
            <span>Day {currentQ.day}</span>
            <span aria-hidden="true">·</span>
            <span>{currentQ.topic}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{currentQ.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{currentQ.type.replace('-', ' ')}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-[#F5F7FA] leading-snug">
            {currentQ.question}
          </h2>

          {/* Code snippet if present */}
          {currentQ.code && (
            <pre className="p-4 bg-[#080C12] rounded-xl border border-[#223044] text-xs sm:text-sm font-mono text-[#78A9FF] overflow-x-auto whitespace-pre leading-relaxed">
              <code>{currentQ.code}</code>
            </pre>
          )}

          {/* Answer Options */}
          <div className="space-y-3" role="radiogroup" aria-label="Answer options">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOpt === opt.id;
              const isCorrectTarget = currentQ.correctAnswer === opt.id;

              let containerClasses =
                'bg-[#101722] border-[#223044] text-[#F5F7FA] hover:border-[#35F2C0]/50';

              if (isRevealed) {
                if (isCorrectTarget) {
                  containerClasses = 'bg-[#35F2C0]/15 border-[#35F2C0] text-[#35F2C0] font-semibold';
                } else if (isSelected && !isCorrectTarget) {
                  containerClasses = 'bg-red-950/40 border-red-500 text-red-300 font-semibold';
                }
              } else if (isSelected) {
                containerClasses = 'bg-[#151F2C] border-[#35F2C0] text-[#35F2C0] font-semibold ring-1 ring-[#35F2C0]/40';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl border flex items-start gap-3.5 text-left transition-all ${containerClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F2C0]`}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <span
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-[#35F2C0] text-[#080C12] border-[#35F2C0]'
                        : 'bg-[#151F2C] text-[#A3ADBA] border-[#223044]'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed pt-0.5">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Hint Trigger */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => toggleHint(currentQ.id)}
              className="flex items-center gap-1.5 text-xs text-[#78A9FF] hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint[currentQ.id] ? 'Hide Pedagogical Hint' : 'Need a Hint?'}</span>
            </button>
          </div>

          {/* Hint Display */}
          {showHint[currentQ.id] && (
            <div className="p-3.5 bg-[#101722] border border-[#78A9FF]/30 rounded-xl text-xs text-[#CBD5E1] space-y-1">
              <span className="font-bold text-[#78A9FF] block">Instructor Hint:</span>
              <p>{currentQ.hint}</p>
            </div>
          )}

          {/* Practice Mode Immediate Feedback (Section F) */}
          {isRevealed && (
            <div
              className={`p-4 rounded-xl border space-y-2.5 ${
                selectedOpt === currentQ.correctAnswer
                  ? 'bg-[#35F2C0]/10 border-[#35F2C0]/30 text-[#F5F7FA]'
                  : 'bg-red-950/30 border-red-800 text-[#F5F7FA]'
              }`}
            >
              <div className="flex items-center gap-2">
                {selectedOpt === currentQ.correctAnswer ? (
                  <CheckCircle2 className="w-5 h-5 text-[#35F2C0]" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-bold text-sm">
                  {selectedOpt === currentQ.correctAnswer
                    ? 'Correct!'
                    : `Incorrect. The correct answer is Option ${currentQ.correctAnswer}.`}
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">{currentQ.explanation}</p>
              {onNavigateToLesson && currentQ.lessonId && (
                <button
                  onClick={() => onNavigateToLesson(currentQ.lessonId)}
                  className="text-xs text-[#78A9FF] hover:underline flex items-center gap-1 font-semibold pt-1"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Review related curriculum lesson
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation Controls: Previous / Next / Review */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#151F2C] hover:bg-[#1A2737] disabled:opacity-40 text-[#F5F7FA] border border-[#223044] rounded-lg text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex items-center gap-2">
          {/* Review all button */}
          <button
            onClick={() => setShowReviewScreen(true)}
            className="px-3.5 py-2.5 bg-[#101722] hover:bg-[#151F2C] text-[#A3ADBA] hover:text-[#F5F7FA] border border-[#223044] rounded-lg text-xs font-semibold transition-colors"
          >
            Review ({answeredCount}/{questions.length})
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-lg text-xs font-bold transition-colors"
            >
              <span>Finish & Submit</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-lg text-xs font-bold transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Final Submission Confirmation Modal (Section E.3) */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#101722] border border-[#223044] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#35F2C0]/10 border border-[#35F2C0]/30 flex items-center justify-center text-[#35F2C0] shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">Submit Examination?</h3>
                <p className="text-xs text-[#A3ADBA] mt-1">
                  {unansweredCount > 0 ? (
                    <span className="text-red-400 font-semibold">
                      Caution: You have {unansweredCount} unanswered questions!
                    </span>
                  ) : (
                    'You have answered all questions.'
                  )}{' '}
                  Once submitted, your responses will be scored and recorded.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#223044]">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-[#151F2C] hover:bg-[#1A2737] text-[#A3ADBA] border border-[#223044] rounded-lg text-xs font-semibold transition-colors"
              >
                Continue Reviewing
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-lg text-xs font-bold transition-colors"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
