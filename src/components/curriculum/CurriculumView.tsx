import React from 'react';
import { curriculumDays } from '../../data/curriculum';
import { Lesson, UserStats, CurriculumDay } from '../../types';
import { BookOpen, Clock, CheckCircle2, ChevronRight, Play, Award } from 'lucide-react';

interface CurriculumViewProps {
  stats: UserStats;
  onSelectLesson: (lesson: Lesson) => void;
  onStartDayPractice: (day: number) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  stats,
  onSelectLesson,
  onStartDayPractice,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2 max-w-3xl">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#35F2C0]" />
          <span className="text-xs font-mono font-bold text-[#35F2C0] uppercase">
            Structured 10-Day Learning Path
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
          HTML & CSS Master Curriculum
        </h1>
        <p className="text-sm text-[#A3ADBA] leading-relaxed">
          From absolute fundamentals to production web architecture. Complete interactive lessons,
          code demonstrations, common mistake breakdowns, and validated MCQ drills.
        </p>
      </div>

      {/* Days Roadmap */}
      <div className="space-y-6">
        {curriculumDays.map((day) => {
          const isDayComplete = day.lessons.every((l) => stats.completedLessons.includes(l.id));

          return (
            <div
              key={day.day}
              className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#223044] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#35F2C0] font-bold">DAY {day.day}</span>
                    <span className="text-[#64748B]">·</span>
                    <span className="text-[#A3ADBA]">{day.tagline}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#F5F7FA]">{day.title}</h2>
                  <p className="text-xs text-[#A3ADBA] max-w-2xl">{day.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => onStartDayPractice(day.day)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#101722] hover:bg-[#35F2C0] text-[#CBD5E1] hover:text-[#080C12] border border-[#223044] hover:border-[#35F2C0] rounded-lg text-xs font-bold transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Practice Day {day.day} MCQs</span>
                  </button>
                </div>
              </div>

              {/* Lesson Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {day.lessons.map((lesson) => {
                  const isLessonDone = stats.completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className="p-5 bg-[#101722] border border-[#223044] hover:border-[#35F2C0]/50 rounded-xl cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-[#A3ADBA]">
                          <div className="flex items-center gap-1.5 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lesson.durationMinutes} mins</span>
                          </div>
                          <span className="capitalize text-xs font-mono text-[#78A9FF]">
                            {lesson.difficulty}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#F5F7FA] group-hover:text-[#35F2C0] transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-[#A3ADBA] line-clamp-2 leading-relaxed">
                          {lesson.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#223044] flex items-center justify-between text-xs">
                        {isLessonDone ? (
                          <span className="flex items-center gap-1 text-[#35F2C0] font-semibold">
                            <CheckCircle2 className="w-4 h-4" /> Completed
                          </span>
                        ) : (
                          <span className="text-[#A3ADBA] group-hover:text-[#F5F7FA]">
                            Read Lesson
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-[#A3ADBA] group-hover:text-[#35F2C0] transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Capstone marker */}
              <div className="p-3 bg-[#101722]/50 border border-[#223044]/60 rounded-lg flex items-center gap-2 text-xs text-[#A3ADBA]">
                <Award className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <span>
                  <strong>Capstone Focus:</strong> {day.capstoneTitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
