import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Code2,
  Gamepad2,
  Bookmark,
  FolderGit2,
  User,
  ShieldCheck,
  Flame,
  Award,
  Menu,
  X
} from 'lucide-react';
import { UserStats } from '../../types';

export type ActiveTab =
  | 'roadmap'
  | 'practice'
  | 'playground'
  | 'games'
  | 'reference'
  | 'projects'
  | 'dashboard';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stats: UserStats;
  onOpenAudit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stats,
  onOpenAudit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'roadmap', label: 'Curriculum', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'practice', label: 'MCQ Practice', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'playground', label: 'Playground', icon: <Code2 className="w-4 h-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'reference', label: 'Reference', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080C12]/95 backdrop-blur-md border-b border-[#223044]">
      {/* Top Bar Contract: Brand — 5 clean links — 1 primary action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('roadmap')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#151F2C] border border-[#35F2C0]/40 flex items-center justify-center text-[#35F2C0] font-mono font-bold text-base group-hover:border-[#35F2C0] transition-colors">
            CS
          </div>
          <span className="text-lg font-bold tracking-tight text-[#F5F7FA] whitespace-nowrap shrink-0">
            CodeSprint <span className="text-[#35F2C0]">Academy</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#A3ADBA]">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#35F2C0] font-semibold border-b-2 border-[#35F2C0]'
                    : 'hover:text-[#F5F7FA]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Quick Telemetry */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Audit Question Bank trigger */}
          <button
            onClick={onOpenAudit}
            title="Inspect Question Bank & Scoring Validation"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#A3ADBA] hover:text-[#35F2C0] bg-[#101722] hover:bg-[#151F2C] border border-[#223044] rounded-md transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#35F2C0]" />
            <span>Audit 105 MCQs</span>
          </button>

          {/* User Progress Pill / Button */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-[#35F2C0] text-[#080C12] border-[#35F2C0] font-bold'
                : 'bg-[#151F2C] text-[#F5F7FA] border-[#223044] hover:border-[#35F2C0]/50'
            }`}
          >
            <div className="flex items-center gap-1 text-[#FBBF24]">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono">{stats.streakDays}d</span>
            </div>
            <span className="text-[#64748B]">•</span>
            <div className="flex items-center gap-1 text-[#35F2C0]">
              <Award className="w-3.5 h-3.5" />
              <span className="font-mono">{stats.xp} XP</span>
            </div>
            <User className="w-3.5 h-3.5 ml-1 text-[#A3ADBA]" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#A3ADBA] hover:text-[#F5F7FA] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#101722] border-b border-[#223044] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-[#151F2C] text-[#35F2C0] font-semibold'
                  : 'text-[#A3ADBA] hover:bg-[#151F2C] hover:text-[#F5F7FA]'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-[#223044] flex items-center justify-between">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2 text-xs text-[#35F2C0] font-medium py-1"
            >
              <User className="w-4 h-4" />
              <span>Student Dashboard ({stats.xp} XP)</span>
            </button>
            <button
              onClick={() => {
                onOpenAudit();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#A3ADBA] hover:text-[#35F2C0]"
            >
              Audit Question Bank
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
