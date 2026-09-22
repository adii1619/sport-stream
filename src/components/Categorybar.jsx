import React from 'react';

const SPORTS_CATEGORIES = [
  { id: 'all', name: 'All Sports', icon: '⚡' },
  { id: 'football', name: 'Football', icon: '⚽' },
  { id: 'cricket', name: 'Cricket', icon: '🏏' },
  { id: 'tennis', name: 'Tennis', icon: '🎾' },
  { id: 'f1', name: 'Formula 1', icon: '🏎️' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'mma', name: 'MMA / Boxing', icon: '🥊' },
  { id: 'esports', name: 'Esports', icon: '🎮' },
];

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <div className="sticky top-24 z-30 bg-slate-950/95 backdrop-blur-md py-3 px-4 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
      <div className="flex gap-2 min-w-max">
        {SPORTS_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}