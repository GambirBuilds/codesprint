import React, { useState } from 'react';
import { guidedProjects } from '../../data/projects';
import { ProjectBrief } from '../../types';
import { FolderGit2, CheckSquare, Square, Code, ExternalLink, Award, Copy, Check } from 'lucide-react';

interface ProjectStudioProps {
  onOpenInPlayground?: (html: string, css: string) => void;
}

export const ProjectStudio: React.FC<ProjectStudioProps> = ({ onOpenInPlayground }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectBrief>(guidedProjects[0]);
  const [activeCodeTab, setActiveCodeTab] = useState<'starter' | 'solution'>('starter');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleCheck = (idx: number) => {
    const key = `${selectedProject.id}-check-${idx}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCopyCode = () => {
    const code =
      activeCodeTab === 'starter'
        ? `<!-- HTML -->\n${selectedProject.starterHtml}\n\n/* CSS */\n${selectedProject.starterCss}`
        : `<!-- HTML -->\n${selectedProject.solutionHtml}\n\n/* CSS */\n${selectedProject.solutionCss}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-[#35F2C0]" />
          <span className="text-xs font-mono font-bold text-[#35F2C0] uppercase">
            Hands-On Portfolio Builds
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
          Guided Project Studio
        </h1>
        <p className="text-sm text-[#A3ADBA]">
          Five real-world website projects designed to synthesize your HTML structure, responsive CSS
          layouts, and accessibility standards into production-ready portfolio work.
        </p>
      </div>

      {/* Project Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {guidedProjects.map((p) => {
          const isSelected = selectedProject.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProject(p);
                setActiveCodeTab('starter');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-[#151F2C] text-[#35F2C0] border-[#35F2C0]'
                  : 'bg-[#101722] text-[#A3ADBA] border-[#223044] hover:text-[#F5F7FA]'
              }`}
            >
              Day {p.day}: {p.title.split(':')[1] || p.title}
            </button>
          );
        })}
      </div>

      {/* Selected Project Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Project Brief, Objectives & Checklist */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#78A9FF] uppercase">
                Day {selectedProject.day} · {selectedProject.difficulty}
              </span>
              <h2 className="text-lg font-bold text-[#F5F7FA]">{selectedProject.title}</h2>
              <p className="text-xs text-[#A3ADBA] leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Checklist */}
            <div className="pt-3 border-t border-[#223044] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#35F2C0]">
                Deliverable Checklist
              </h3>
              <div className="space-y-2">
                {selectedProject.checklist.map((item, idx) => {
                  const key = `${selectedProject.id}-check-${idx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className="w-full flex items-start gap-2.5 text-left text-xs text-[#CBD5E1] hover:text-[#F5F7FA] group"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#35F2C0] shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-[#64748B] group-hover:text-[#A3ADBA] shrink-0 mt-0.5" />
                      )}
                      <span className={isChecked ? 'line-through text-[#64748B]' : ''}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rubric */}
            <div className="pt-3 border-t border-[#223044] space-y-2 text-xs">
              <h3 className="font-bold text-[#F5F7FA]">Evaluation Rubric</h3>
              {selectedProject.rubric.map((r, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#A3ADBA]">
                  <span className="truncate pr-2">{r.criterion}</span>
                  <span className="font-mono text-[#35F2C0] shrink-0">{r.weight}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Code Viewer & Starters */}
        <div className="lg:col-span-2 bg-[#151F2C] border border-[#223044] rounded-2xl overflow-hidden flex flex-col min-h-[500px]">
          {/* Code Tab Switcher */}
          <div className="px-6 py-3 bg-[#101722] border-b border-[#223044] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCodeTab('starter')}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  activeCodeTab === 'starter'
                    ? 'bg-[#151F2C] text-[#35F2C0]'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                Starter Scaffold
              </button>
              <button
                onClick={() => setActiveCodeTab('solution')}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  activeCodeTab === 'solution'
                    ? 'bg-[#151F2C] text-[#35F2C0]'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                Reference Solution
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#151F2C] hover:bg-[#1A2737] text-[#A3ADBA] hover:text-[#F5F7FA] border border-[#223044] rounded text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#35F2C0]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Code Display */}
          <div className="flex-1 p-6 bg-[#080C12] space-y-4 overflow-x-auto">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#35F2C0] block">HTML Blueprint</span>
              <pre className="p-4 bg-[#101722] rounded-xl border border-[#223044] text-xs font-mono text-[#CBD5E1] whitespace-pre leading-relaxed">
                <code>
                  {activeCodeTab === 'starter'
                    ? selectedProject.starterHtml
                    : selectedProject.solutionHtml}
                </code>
              </pre>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-mono text-[#78A9FF] block">CSS Stylesheet</span>
              <pre className="p-4 bg-[#101722] rounded-xl border border-[#223044] text-xs font-mono text-[#CBD5E1] whitespace-pre leading-relaxed">
                <code>
                  {activeCodeTab === 'starter'
                    ? selectedProject.starterCss
                    : selectedProject.solutionCss}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
