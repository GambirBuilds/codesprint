import React, { useState } from 'react';
import { educationalGames, GameDefinition } from '../../data/games';
import { Gamepad2, Award, ArrowLeft, CheckCircle2, XCircle, HelpCircle, Play, Sparkles } from 'lucide-react';
import { UserStats } from '../../types';
import { loadUserStats, saveUserStats } from '../../services/storage';

interface GamesHubProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ stats, onUpdateStats }) => {
  const [activeGame, setActiveGame] = useState<GameDefinition | null>(null);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Record<string, number>>({});

  const handleSelectGame = (game: GameDefinition) => {
    setActiveGame(game);
    setCurrentLevelIdx(0);
    setSelectedOptionId(null);
    setRevealed(false);
    setShowHint(false);
  };

  const handleExitGame = () => {
    setActiveGame(null);
    setSelectedOptionId(null);
    setRevealed(false);
    setShowHint(false);
  };

  const handleChooseOption = (optId: string) => {
    if (revealed) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!activeGame || !selectedOptionId) return;
    setRevealed(true);

    const level = activeGame.levels[currentLevelIdx];
    const chosen = level.options.find((o) => o.id === selectedOptionId);
    if (chosen && chosen.correct) {
      // Award XP if not already awarded
      const gameKey = `${activeGame.id}-lvl-${level.level}`;
      if (!completedLevels[gameKey]) {
        setCompletedLevels((prev) => ({ ...prev, [gameKey]: 1 }));
        const currentStats = loadUserStats();
        const updatedStats: UserStats = {
          ...currentStats,
          xp: currentStats.xp + 20,
        };
        saveUserStats(updatedStats);
        onUpdateStats(updatedStats);
      }
    }
  };

  const handleNextLevel = () => {
    if (!activeGame) return;
    if (currentLevelIdx < activeGame.levels.length - 1) {
      setCurrentLevelIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setRevealed(false);
      setShowHint(false);
    } else {
      handleExitGame();
    }
  };

  // Active Game View
  if (activeGame) {
    const level = activeGame.levels[currentLevelIdx];
    const chosenOption = level.options.find((o) => o.id === selectedOptionId);

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
        {/* Game Navigation Header */}
        <div className="flex items-center justify-between border-b border-[#223044] pb-4">
          <button
            onClick={handleExitGame}
            className="flex items-center gap-1.5 text-xs text-[#A3ADBA] hover:text-[#F5F7FA]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Games
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#35F2C0] bg-[#35F2C0]/10 px-2.5 py-1 rounded border border-[#35F2C0]/20">
              Level {level.level} of {activeGame.levels.length}
            </span>
          </div>
        </div>

        {/* Level Card */}
        <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#78A9FF]">{activeGame.title}</span>
            <h2 className="text-xl font-bold text-[#F5F7FA]">{level.challengeTitle}</h2>
            <p className="text-xs text-[#A3ADBA]">{level.instructions}</p>
          </div>

          {/* Code snippet if present */}
          {level.codeSnippet && (
            <pre className="p-4 bg-[#080C12] rounded-xl border border-[#223044] text-xs font-mono text-[#78A9FF] overflow-x-auto whitespace-pre">
              <code>{level.codeSnippet}</code>
            </pre>
          )}

          <div className="text-sm font-semibold text-[#F5F7FA]">{level.question}</div>

          {/* Options */}
          <div className="space-y-3">
            {level.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnClass = 'bg-[#101722] border-[#223044] text-[#F5F7FA] hover:border-[#35F2C0]/50';

              if (revealed) {
                if (opt.correct) {
                  btnClass = 'bg-[#35F2C0]/15 border-[#35F2C0] text-[#35F2C0] font-semibold';
                } else if (isSelected && !opt.correct) {
                  btnClass = 'bg-red-950/40 border-red-500 text-red-300 font-semibold';
                }
              } else if (isSelected) {
                btnClass = 'bg-[#151F2C] border-[#35F2C0] text-[#35F2C0] font-semibold';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleChooseOption(opt.id)}
                  disabled={revealed}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnClass}`}
                >
                  <span className="font-mono font-bold shrink-0">{opt.id}.</span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Hint Trigger */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-[#78A9FF] hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-3 bg-[#101722] border border-[#78A9FF]/30 rounded-lg text-xs text-[#CBD5E1]">
              <span className="font-bold text-[#78A9FF] block mb-0.5">Hint:</span>
              <p>{level.hint}</p>
            </div>
          )}

          {/* Feedback Banner */}
          {revealed && chosenOption && (
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                chosenOption.correct
                  ? 'bg-[#35F2C0]/10 border-[#35F2C0]/30 text-[#F5F7FA]'
                  : 'bg-red-950/30 border-red-800 text-[#F5F7FA]'
              }`}
            >
              <div className="flex items-center gap-2">
                {chosenOption.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-[#35F2C0]" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-bold text-sm">
                  {chosenOption.correct ? 'Level Solved (+20 XP)!' : 'Try Again!'}
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1]">{chosenOption.feedback}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            {!revealed ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 bg-[#35F2C0] hover:bg-[#2dd4a8] disabled:opacity-40 text-[#080C12] rounded-lg text-xs font-bold transition-colors"
              >
                Confirm Solution
              </button>
            ) : (
              <button
                onClick={handleNextLevel}
                className="px-6 py-2.5 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-lg text-xs font-bold transition-colors"
              >
                {currentLevelIdx < activeGame.levels.length - 1 ? 'Next Challenge' : 'Complete Game'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Games Hub Overview
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-[#35F2C0]" />
          <span className="text-xs font-mono font-bold text-[#35F2C0] uppercase">
            Interactive Simulations & Puzzles
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
          Educational Games Arcade
        </h1>
        <p className="text-sm text-[#A3ADBA] max-w-2xl">
          Six complete educational games designed to reinforce HTML semantics, CSS selector precision,
          syntax debugging, layout puzzles, and mobile responsive rescue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalGames.map((game, idx) => (
          <div
            key={game.id}
            className="bg-[#151F2C] border border-[#223044] hover:border-[#35F2C0]/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#101722] border border-[#223044] flex items-center justify-center text-[#35F2C0] group-hover:border-[#35F2C0]/40 transition-colors">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA] group-hover:text-[#35F2C0] transition-colors">
                  {game.title}
                </h3>
                <div className="text-xs text-[#78A9FF] mt-0.5">{game.tagline}</div>
              </div>
              <p className="text-xs text-[#A3ADBA] leading-relaxed">{game.description}</p>
            </div>

            <div className="pt-4 border-t border-[#223044] flex items-center justify-between">
              <span className="text-xs font-mono text-[#A3ADBA]">
                {game.levels.length} Challenges
              </span>
              <button
                onClick={() => handleSelectGame(game)}
                className="px-4 py-2 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Game</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
