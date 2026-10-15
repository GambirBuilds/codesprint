import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { LessonReader } from './components/curriculum/LessonReader';
import { MCQPracticeCenter } from './components/mcq/MCQPracticeCenter';
import { Playground } from './components/playground/Playground';
import { GamesHub } from './components/games/GamesHub';
import { ReferenceLibrary } from './components/reference/ReferenceLibrary';
import { ProjectStudio } from './components/projects/ProjectStudio';
import { Dashboard } from './components/dashboard/Dashboard';
import { QualityAuditModal } from './components/mcq/QualityAuditModal';
import { loadUserStats, saveUserStats } from './services/storage';
import { Lesson, UserStats } from './types';
import { getLessonById, curriculumDays } from './data/curriculum';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('practice');
  const [stats, setStats] = useState<UserStats>(loadUserStats);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  useEffect(() => {
    // Keep local stats fresh
    setStats(loadUserStats());
  }, []);

  const handleUpdateStats = (newStats: UserStats) => {
    setStats(newStats);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    const isCompleted = stats.completedLessons.includes(lessonId);
    let updatedCompleted: string[];
    let xpBonus = 0;

    if (isCompleted) {
      updatedCompleted = stats.completedLessons.filter((id) => id !== lessonId);
    } else {
      updatedCompleted = [...stats.completedLessons, lessonId];
      xpBonus = 25; // 25 XP per completed lesson
    }

    const updated: UserStats = {
      ...stats,
      completedLessons: updatedCompleted,
      xp: stats.xp + xpBonus,
    };
    saveUserStats(updated);
    setStats(updated);
  };

  const handleNavigateToLessonById = (lessonId: string) => {
    const lesson = getLessonById(lessonId);
    if (lesson) {
      setActiveLesson(lesson);
      setActiveTab('roadmap');
    } else {
      setActiveTab('roadmap');
    }
  };

  const handleStartDayPractice = (day: number) => {
    setActiveTab('practice');
  };

  const handleStartMCQPracticeFromLesson = (topicName: string) => {
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen bg-[#080C12] text-[#F5F7FA] flex flex-col font-sans selection:bg-[#35F2C0]/20 selection:text-[#35F2C0]">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'roadmap' && activeLesson) {
            // Keep lesson or reset based on context
          } else {
            setActiveLesson(null);
          }
        }}
        stats={stats}
        onOpenAudit={() => setShowAuditModal(true)}
      />

      {/* Main Content Viewports */}
      <main className="flex-1 pb-16">
        {activeTab === 'roadmap' && (
          <>
            {activeLesson ? (
              <LessonReader
                lesson={activeLesson}
                stats={stats}
                onBack={() => setActiveLesson(null)}
                onToggleComplete={handleToggleLessonComplete}
                onStartMCQPractice={handleStartMCQPracticeFromLesson}
              />
            ) : (
              <CurriculumView
                stats={stats}
                onSelectLesson={handleSelectLesson}
                onStartDayPractice={handleStartDayPractice}
              />
            )}
          </>
        )}

        {activeTab === 'practice' && (
          <MCQPracticeCenter
            stats={stats}
            onUpdateStats={handleUpdateStats}
            onNavigateToLesson={handleNavigateToLessonById}
            onOpenAudit={() => setShowAuditModal(true)}
          />
        )}

        {activeTab === 'playground' && <Playground />}

        {activeTab === 'games' && (
          <GamesHub stats={stats} onUpdateStats={handleUpdateStats} />
        )}

        {activeTab === 'reference' && (
          <ReferenceLibrary onNavigateToLesson={handleNavigateToLessonById} />
        )}

        {activeTab === 'projects' && <ProjectStudio />}

        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            onUpdateStats={handleUpdateStats}
            onNavigateToPractice={() => setActiveTab('practice')}
            onNavigateToCurriculum={() => setActiveTab('roadmap')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#223044] bg-[#080C12] py-8 text-xs text-[#A3ADBA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#151F2C] border border-[#35F2C0]/40 flex items-center justify-center text-[#35F2C0] font-mono font-bold text-[10px]">
              CS
            </div>
            <span className="font-semibold text-[#F5F7FA]">CodeSprint Academy</span>
            <span className="text-[#64748B]">·</span>
            <span>10-Day HTML & CSS Comprehensive Practice and Examination Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[#A3ADBA]">
            <button onClick={() => setShowAuditModal(true)} className="hover:text-[#35F2C0]">
              Audit Question Bank (105 MCQs)
            </button>
            <span className="text-[#64748B]">·</span>
            <span>No Cookies · Local Data Storage</span>
          </div>
        </div>
      </footer>

      {/* Quality Audit Modal */}
      <QualityAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />
    </div>
  );
}
