import React, { useState } from 'react';
import { UserStats } from '../../types';
import {
  calculatePerformanceAnalytics,
  resetUserProgress,
  exportProgressAsJson,
  importProgressFromJson,
} from '../../services/storage';
import {
  Flame,
  Award,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface DashboardProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onNavigateToPractice: () => void;
  onNavigateToCurriculum: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  onUpdateStats,
  onNavigateToPractice,
  onNavigateToCurriculum,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const analytics = calculatePerformanceAnalytics(stats);
  const totalLessons = 10;
  const courseProgressPct = Math.min(
    100,
    Math.round((stats.completedLessons.length / totalLessons) * 100)
  );

  const userLevel = Math.floor(stats.xp / 100) + 1;
  const xpToNextLevel = userLevel * 100 - stats.xp;

  const handleExport = () => {
    const dataStr = exportProgressAsJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codesprint-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importProgressFromJson(content);
      if (success) {
        setImportStatus('Progress imported successfully!');
        window.location.reload();
      } else {
        setImportStatus('Invalid progress data format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetUserProgress();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#35F2C0] uppercase">
              Student Progress Console
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
              Welcome Back, Web Apprentice
            </h1>
            <p className="text-xs sm:text-sm text-[#A3ADBA]">
              All achievements, assessment histories, and practice statistics are stored locally in
              your browser.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToCurriculum}
              className="px-4 py-2.5 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-xl text-xs font-bold transition-all shadow-md"
            >
              Continue Learning
            </button>
            <button
              onClick={onNavigateToPractice}
              className="px-4 py-2.5 bg-[#101722] hover:bg-[#1A2737] text-[#78A9FF] border border-[#223044] rounded-xl text-xs font-semibold transition-colors"
            >
              Practice MCQs
            </button>
          </div>
        </div>

        {/* Level & XP Bar */}
        <div className="mt-6 pt-6 border-t border-[#223044] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-[#F5F7FA]">
              Level {userLevel} · <span className="text-[#35F2C0]">{stats.xp} Total XP</span>
            </span>
            <span className="text-[#A3ADBA] font-mono">{xpToNextLevel} XP to Level {userLevel + 1}</span>
          </div>
          <div className="w-full bg-[#101722] h-2 rounded-full overflow-hidden border border-[#223044]">
            <div
              className="bg-[#35F2C0] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (stats.xp % 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A3ADBA]">Active Streak</span>
            <Flame className="w-4 h-4 text-[#FBBF24]" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#F5F7FA]">
            {stats.streakDays} <span className="text-xs text-[#A3ADBA] font-normal">days</span>
          </div>
        </div>

        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A3ADBA]">Lessons Completed</span>
            <BookOpen className="w-4 h-4 text-[#35F2C0]" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#F5F7FA]">
            {stats.completedLessons.length} <span className="text-xs text-[#A3ADBA] font-normal">/ {totalLessons}</span>
          </div>
        </div>

        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A3ADBA]">Questions Attempted</span>
            <HelpCircle className="w-4 h-4 text-[#78A9FF]" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#F5F7FA]">
            {analytics.totalAttempted}
          </div>
        </div>

        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A3ADBA]">Overall MCQ Accuracy</span>
            <Award className="w-4 h-4 text-[#A78BFA]" />
          </div>
          <div className="text-2xl font-mono font-bold text-[#35F2C0]">
            {analytics.overallAccuracy}%
          </div>
        </div>
      </div>

      {/* Recent Exam Sessions */}
      <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-[#F5F7FA]">Examination History</h2>
        {stats.examHistory.length === 0 ? (
          <div className="p-8 text-center bg-[#101722] border border-[#223044] rounded-xl text-xs text-[#A3ADBA]">
            No completed exams yet. Take the 50-Question Examination to record your official results.
          </div>
        ) : (
          <div className="space-y-3">
            {stats.examHistory.slice(0, 5).map((exam) => (
              <div
                key={exam.attemptId}
                className="p-4 bg-[#101722] border border-[#223044] rounded-xl flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        exam.passed
                          ? 'bg-[#35F2C0]/15 text-[#35F2C0] border border-[#35F2C0]/30'
                          : 'bg-red-950/40 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {exam.passed ? 'PASSED' : 'NOT PASSED'}
                    </span>
                    <span className="text-[#CBD5E1] font-semibold">
                      {exam.scorePercentage}% Score
                    </span>
                    <span className="text-[#64748B]">·</span>
                    <span className="text-[#A3ADBA]">
                      {exam.correctAnswers}/{exam.totalQuestions} Correct
                    </span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    Attempted on {new Date(exam.timestamp).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-right font-mono text-[#78A9FF]">
                  {Math.round(exam.timeSpentSeconds / 60)}m spent
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Data Management (Export, Import, Reset) */}
      <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-[#F5F7FA]">Learning Data & Browser Storage</h2>
        <p className="text-xs text-[#A3ADBA]">
          Your study records and exam attempts stay securely in your local browser. Export a backup
          file to preserve your learning history across machines.
        </p>

        {importStatus && (
          <div className="p-3 bg-[#101722] border border-[#35F2C0]/40 rounded-lg text-xs text-[#35F2C0]">
            {importStatus}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#101722] hover:bg-[#1A2737] text-[#CBD5E1] border border-[#223044] rounded-lg text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-[#35F2C0]" />
            <span>Export Progress (JSON)</span>
          </button>

          <label className="flex items-center gap-1.5 px-4 py-2 bg-[#101722] hover:bg-[#1A2737] text-[#CBD5E1] border border-[#223044] rounded-lg text-xs font-semibold cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-[#78A9FF]" />
            <span>Import Progress</span>
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/40 rounded-lg text-xs font-semibold transition-colors ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#101722] border border-[#223044] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA]">Confirm Progress Reset?</h3>
                <p className="text-xs text-[#A3ADBA] mt-1">
                  This will erase your completed lessons, quiz history, XP, and streaks. This
                  operation cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#223044]">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-[#151F2C] hover:bg-[#1A2737] text-[#A3ADBA] border border-[#223044] rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
