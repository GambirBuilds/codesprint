import React, { useState } from 'react';
import { referenceItems } from '../../data/reference';
import { ReferenceItem } from '../../types';
import { Search, Bookmark, Code2, ExternalLink, Filter, Sparkles } from 'lucide-react';

interface ReferenceLibraryProps {
  onNavigateToLesson: (lessonId: string) => void;
}

export const ReferenceLibrary: React.FC<ReferenceLibraryProps> = ({ onNavigateToLesson }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'html' | 'css'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ReferenceItem | null>(null);

  // Filter items
  const categories = Array.from(new Set(referenceItems.map((item) => item.category)));

  const filteredItems = referenceItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesType && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#35F2C0]" />
          <span className="text-xs font-mono font-bold text-[#35F2C0] uppercase">
            Technical Documentation
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
          HTML & CSS Reference Library
        </h1>
        <p className="text-sm text-[#A3ADBA]">
          Searchable documentation covering core HTML elements, attributes, semantic roles, and CSS
          properties, units, and layout models.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#151F2C] border border-[#223044] rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#A3ADBA] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tags, properties, attributes (e.g., flexbox, clamp, dialog, border-box)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#101722] border border-[#223044] rounded-xl text-xs sm:text-sm text-[#F5F7FA] placeholder-[#64748B] outline-none focus:border-[#35F2C0]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Type filter */}
          <div className="flex items-center gap-1 p-1 bg-[#101722] border border-[#223044] rounded-lg">
            {(['all', 'html', 'css'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded capitalize transition-colors ${
                  typeFilter === t
                    ? 'bg-[#35F2C0] text-[#080C12] font-bold'
                    : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
                }`}
              >
                {t === 'all' ? 'All Reference' : t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#A3ADBA]" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1.5 bg-[#101722] border border-[#223044] rounded-lg text-xs text-[#F5F7FA] outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-[#151F2C] border border-[#223044] hover:border-[#35F2C0]/50 rounded-xl p-5 cursor-pointer flex flex-col justify-between space-y-4 transition-all group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A3ADBA]">
                <span className="font-mono uppercase text-[#35F2C0] font-semibold">{item.type}</span>
                <span>{item.category}</span>
              </div>
              <h3 className="text-base font-mono font-bold text-[#F5F7FA] group-hover:text-[#35F2C0] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-[#A3ADBA] line-clamp-2 leading-relaxed">
                {item.definition}
              </p>
            </div>

            <div className="pt-3 border-t border-[#223044] flex items-center justify-between text-xs text-[#78A9FF]">
              <span className="font-mono text-[11px] truncate pr-2">{item.syntax}</span>
              <span className="shrink-0 group-hover:underline">View Spec</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#101722] border border-[#223044] rounded-xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#223044] pb-3">
              <div>
                <span className="text-xs font-mono text-[#35F2C0] uppercase font-bold">
                  {selectedItem.type.toUpperCase()} · {selectedItem.category}
                </span>
                <h2 className="text-xl font-mono font-bold text-[#F5F7FA] mt-0.5">
                  {selectedItem.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-[#A3ADBA] hover:text-[#F5F7FA] p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#A3ADBA] block font-semibold mb-1">Definition:</span>
                <p className="text-[#CBD5E1] text-sm leading-relaxed">{selectedItem.definition}</p>
              </div>

              <div>
                <span className="text-[#A3ADBA] block font-semibold mb-1">Standard Syntax:</span>
                <pre className="p-3 bg-[#080C12] rounded-lg border border-[#223044] font-mono text-[#35F2C0]">
                  <code>{selectedItem.syntax}</code>
                </pre>
              </div>

              {selectedItem.valuesOrAttributes && (
                <div>
                  <span className="text-[#A3ADBA] block font-semibold mb-1">
                    Accepted Values / Attributes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.valuesOrAttributes.map((val) => (
                      <span
                        key={val}
                        className="px-2 py-0.5 bg-[#151F2C] border border-[#223044] rounded font-mono text-[#78A9FF]"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-[#A3ADBA] block font-semibold mb-1">Code Example:</span>
                <pre className="p-3 bg-[#080C12] rounded-lg border border-[#223044] font-mono text-[#CBD5E1] overflow-x-auto whitespace-pre">
                  <code>{selectedItem.exampleCode}</code>
                </pre>
              </div>

              {selectedItem.commonMistake && (
                <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg">
                  <span className="text-red-400 font-bold block mb-0.5">Common Pitfall:</span>
                  <p className="text-[#CBD5E1]">{selectedItem.commonMistake}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#223044] flex items-center justify-between">
              {selectedItem.relatedLessonId ? (
                <button
                  onClick={() => {
                    const lId = selectedItem.relatedLessonId!;
                    setSelectedItem(null);
                    onNavigateToLesson(lId);
                  }}
                  className="text-xs text-[#35F2C0] hover:underline flex items-center gap-1 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Read corresponding lesson
                </button>
              ) : (
                <span />
              )}
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-[#151F2C] hover:bg-[#1A2737] text-[#F5F7FA] border border-[#223044] rounded-lg text-xs font-semibold"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
