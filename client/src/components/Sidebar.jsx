import React from 'react';
import { Home, Flame, Radio, Bookmark, Trophy, ShieldCheck, History, Star } from 'lucide-react';

export default function Sidebar({ isOpen, activeView, onSelectNav }) {
  const mainNav = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'trending', name: 'Trending Highlights', icon: Flame },
    { id: 'live', name: 'Live Arenas', icon: Radio, badge: '3 LIVE' },
    { id: 'saved', name: 'Watchlist', icon: Bookmark },
  ];

  const competitions = [
    { id: 'tournaments', name: 'Major Tournaments', icon: Trophy },
    { id: 'leagues', name: 'Top Leagues', icon: ShieldCheck },
    { id: 'favorites', name: 'Favorite Teams', icon: Star },
  ];

  const library = [
    { id: 'history', name: 'Watch History', icon: History },
  ];

  return (
    <aside 
      className={`relative z-40 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-r border-slate-800/80 transition-all duration-300 flex flex-col justify-between select-none ${
        isOpen ? 'w-64' : 'w-20 hidden md:flex'
      }`}
    >
      <div className="p-3 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-800 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500">
        {/* Main Nav */}
        <div>
          {isOpen && (
            <p className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Menu
            </p>
          )}
          <div className="space-y-1">
            {mainNav.map((item) => {
              const isActive = (item.id === 'saved' && activeView === 'saved') || (item.id === 'home' && activeView === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectNav(item.id)}
                  className={`relative w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-150 group ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-400 rounded-r-full shadow-sm shadow-emerald-400"></span>
                  )}

                  <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />

                  {isOpen && (
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] font-black bg-red-500/20 text-red-400 px-2 py-0.5 rounded-md border border-red-500/30 animate-pulse tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Competitions Section */}
        <div>
          {isOpen && (
            <p className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Competitions
            </p>
          )}
          <div className="space-y-1">
            {competitions.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all duration-150 group"
              >
                <item.icon className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 group-hover:scale-110" />
                {isOpen && <span className="truncate">{item.name}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Library Section */}
        <div>
          {isOpen && (
            <p className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
              Library
            </p>
          )}
          <div className="space-y-1">
            {library.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all duration-150 group"
              >
                <item.icon className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 group-hover:scale-110" />
                {isOpen && <span className="truncate">{item.name}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      {isOpen && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/50 to-slate-900 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Pass Status</span>
              <span className="text-[10px] font-medium text-emerald-400">All-Access HD</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>
      )}
    </aside>
  );
}