import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Sports');

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Navbar Header */}
      <Navbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Scrollable Content View */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="p-8 border border-slate-800 rounded-2xl bg-slate-900/40 text-center">
            <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Layout Locked
            </span>
            <h2 className="text-2xl font-black mt-4 text-white uppercase tracking-wide">
              Active Filter: <span className="text-emerald-400">{activeCategory}</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
              Flexbox container active. Zero pixel overlaps!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}