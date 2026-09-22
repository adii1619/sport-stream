import React from 'react';
import { Menu, Search, Bell, User, Tv, Activity } from 'lucide-react';

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

export default function Navbar({ toggleSidebar, activeCategory, onSelectCategory }) {
  const liveScores = [
    { id: 1, sport: '⚽', match: 'Real Madrid 2 - 1 Bayern', status: '82\'', isLive: true },
    { id: 2, sport: '🏏', match: 'IND 245/6 vs PAK', status: '34.2 ov', isLive: true },
    { id: 3, sport: '🎾', match: 'Alcaraz 2 - 1 Sinner', status: 'Set 4', isLive: true },
    { id: 4, sport: '🏎️', match: 'Monaco GP', status: 'Lap 45/78', isLive: true },
  ];

  return (
    <div className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* 1. Live Scores Ticker Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-xs text-slate-300 py-1.5 px-4 flex items-center overflow-x-auto no-scrollbar gap-6">
        <div className="flex items-center gap-1.5 font-bold text-emerald-400 shrink-0 uppercase tracking-wider text-[11px]">
          <Activity className="w-3.5 h-3.5 animate-pulse text-red-500" />
          <span>Live Scores:</span>
        </div>
        <div className="flex items-center gap-6 shrink-0 font-medium">
          {liveScores.map((score) => (
            <div key={score.id} className="flex items-center gap-2 bg-slate-900/90 px-2.5 py-0.5 rounded border border-slate-800">
              <span>{score.sport}</span>
              <span className="text-white font-semibold">{score.match}</span>
              <span className="text-red-400 font-mono text-[10px] bg-red-500/10 px-1 rounded border border-red-500/20">
                {score.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Broadcast Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white border border-transparent hover:border-slate-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="bg-emerald-500 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Tv className="w-5 h-5 text-slate-950 font-extrabold" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white leading-none uppercase">
                Stadium<span className="text-emerald-400">Hub</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Sports Network</span>
            </div>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-1 max-w-xl mx-6 hidden sm:block">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search teams, leagues, or tournaments (e.g. Premier League, IPL)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-4 pr-10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button className="absolute right-1.5 p-1.5 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-400 rounded-lg transition-all">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition-all">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            Live Stream
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors relative border border-transparent hover:border-slate-700">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-slate-900"></span>
          </button>
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* 3. Integrated Sports Category Bar */}
      <div className="py-2.5 px-4 overflow-x-auto no-scrollbar">
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
    </div>
  );
}