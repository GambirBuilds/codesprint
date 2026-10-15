import React from 'react';
import { Lesson, UserStats } from '../../types';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Code2,
  Sparkles,
} from 'lucide-react';

interface LessonReaderProps {
  lesson: Lesson;
  stats: UserStats;
  onBack: () => void;
  onToggleComplete: (lessonId: string) => void;
  onStartMCQPractice: (topicName: string) => void;
}

export const LessonReader: React.FC<LessonReaderProps> = ({
  lesson,
  stats,
  onBack,
  onToggleComplete,
  onStartMCQPractice,
}) => {
  const isCompleted = stats.completedLessons.includes(lesson.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-[#223044] pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[#A3ADBA] hover:text-[#F5F7FA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Curriculum
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onStartMCQPractice(lesson.title)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#151F2C] hover:bg-[#35F2C0] text-[#78A9FF] hover:text-[#080C12] border border-[#223044] hover:border-[#35F2C0] rounded-md text-xs font-bold transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Practice Related MCQs</span>
          </button>

          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-colors ${
              isCompleted
                ? 'bg-[#35F2C0]/20 text-[#35F2C0] border-[#35F2C0]'
                : 'bg-[#35F2C0] text-[#080C12] border-[#35F2C0] hover:bg-[#2dd4a8]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#A3ADBA]">
          <span>Day {lesson.day}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">{lesson.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span>{lesson.durationMinutes} Minutes Study</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] leading-tight">
          {lesson.title}
        </h1>
        <p className="text-sm sm:text-base text-[#A3ADBA] leading-relaxed">{lesson.summary}</p>
      </div>

      {/* Learning Objectives */}
      <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#35F2C0] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Learning Objectives
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-[#CBD5E1]">
          {lesson.learningObjectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#35F2C0] font-bold">✓</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detailed Technical Theory */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#F5F7FA]">Technical Theory & Conceptual Framework</h2>
        <div className="space-y-3 text-sm text-[#CBD5E1] leading-relaxed">
          {lesson.theory.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Terminology Reference Table */}
      {lesson.terminology.length > 0 && (
        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#F5F7FA]">Key Terminology & Definitions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {lesson.terminology.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#101722] border border-[#223044] rounded-lg space-y-1">
                <span className="font-mono font-bold text-[#78A9FF] block">{item.term}</span>
                <p className="text-[#A3ADBA] leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Examples with Annotated Explanations */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-[#F5F7FA]">Annotated Code Examples</h2>
        {lesson.codeExamples.map((ex, idx) => (
          <div key={idx} className="bg-[#151F2C] border border-[#223044] rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-[#101722] border-b border-[#223044] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F5F7FA]">{ex.title}</span>
              <span className="font-mono text-[#35F2C0] uppercase text-[11px]">{ex.language}</span>
            </div>
            <pre className="p-4 bg-[#080C12] text-xs sm:text-sm font-mono text-[#78A9FF] overflow-x-auto whitespace-pre leading-relaxed">
              <code>{ex.code}</code>
            </pre>
            <div className="p-4 bg-[#151F2C] text-xs text-[#CBD5E1] leading-relaxed border-t border-[#223044]">
              <strong className="text-[#35F2C0]">Explanation:</strong> {ex.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Common Mistakes & Fixes */}
      {lesson.commonMistakes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#F5F7FA] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Common Pitfalls & Production Fixes</span>
          </h2>
          <div className="space-y-3">
            {lesson.commonMistakes.map((m, idx) => (
              <div key={idx} className="p-4 bg-[#101722] border border-red-900/40 rounded-xl space-y-2 text-xs">
                <div className="text-red-300 font-mono font-semibold">
                  ❌ Mistake: {m.mistake}
                </div>
                <div className="text-[#35F2C0] font-mono font-semibold">
                  ✓ Recommended Fix: {m.fix}
                </div>
                <p className="text-[#A3ADBA] leading-relaxed pt-1">{m.why}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices Checklist */}
      {lesson.bestPractices.length > 0 && (
        <div className="bg-[#151F2C] border border-[#223044] rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-[#F5F7FA] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#FBBF24]" />
            <span>Industry Best Practices</span>
          </h3>
          <ul className="space-y-2 text-xs text-[#CBD5E1]">
            {lesson.bestPractices.map((bp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#FBBF24] font-bold">★</span>
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Completion Banner */}
      <div className="p-6 bg-[#151F2C] border border-[#223044] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-base font-bold text-[#F5F7FA]">Finished this lesson?</div>
          <p className="text-xs text-[#A3ADBA]">
            Test your comprehension with the topic MCQ question bank or move to the next topic.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onStartMCQPractice(lesson.title)}
            className="px-4 py-2 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-lg text-xs font-bold transition-colors"
          >
            Launch MCQ Drill
          </button>
        </div>
      </div>
    </div>
  );
};
