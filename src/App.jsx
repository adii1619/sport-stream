import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import WatchPage from './components/WatchPage';
import { MOCK_VIDEOS } from './data/mockVideos';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Sports');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveOnly, setIsLiveOnly] = useState(false);
  const [activeView, setActiveView] = useState('home'); // 'home' | 'saved'

  // Load saved video IDs from localStorage on initial render
  const [savedVideoIds, setSavedVideoIds] = useState(() => {
    const saved = localStorage.getItem('stadiumhub_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync saved videos to localStorage whenever savedVideoIds changes
  useEffect(() => {
    localStorage.setItem('stadiumhub_watchlist', JSON.stringify(savedVideoIds));
  }, [savedVideoIds]);

  const toggleSaveVideo = (videoId) => {
    setSavedVideoIds((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  // Multi-Filter Logic: View Mode + Category + Search + Live Toggle
  const filteredVideos = MOCK_VIDEOS.filter((video) => {
    // Watchlist View Filter
    if (activeView === 'saved' && !savedVideoIds.includes(video.id)) {
      return false;
    }

    // Category Filter
    const matchesCategory =
      activeCategory === 'All Sports' ||
      video.sport.toLowerCase() === activeCategory.toLowerCase();

    // Search Filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      video.title.toLowerCase().includes(query) ||
      video.sport.toLowerCase().includes(query) ||
      video.league.toLowerCase().includes(query) ||
      video.teams.home.toLowerCase().includes(query) ||
      video.teams.away.toLowerCase().includes(query);

    // Live Only Filter
    const matchesLive = !isLiveOnly || video.isLive;

    return matchesCategory && matchesSearch && matchesLive;
  });

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setActiveView('home');
    setSelectedVideo(null);
  };

  const handleNavSelect = (navId) => {
    if (navId === 'saved') {
      setActiveView('saved');
    } else {
      setActiveView('home');
    }
    setSelectedVideo(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header with Search & Live Controls */}
      <Navbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={(q) => { setSearchQuery(q); setSelectedVideo(null); }}
        isLiveOnly={isLiveOnly}
        onLiveOnlyToggle={() => { setIsLiveOnly((prev) => !prev); setSelectedVideo(null); }}
      />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          activeView={activeView}
          onSelectNav={handleNavSelect}
        />

        {/* View Switcher: Watch Page vs Video Grid */}
        {selectedVideo ? (
          <WatchPage
            key={selectedVideo.id}
            video={selectedVideo}
            onBack={() => setSelectedVideo(null)}
            relatedVideos={MOCK_VIDEOS}
            onSelectVideo={(video) => setSelectedVideo(video)}
            isSaved={savedVideoIds.includes(selectedVideo.id)}
            onToggleSave={() => toggleSaveVideo(selectedVideo.id)}
          />
        ) : (
          <main className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-800 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500">
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <span>{activeView === 'saved' ? 'Saved Watchlist' : activeCategory}</span>
                  <span className="text-xs font-bold text-slate-400 font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                    {filteredVideos.length} matches
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeView === 'saved' 
                    ? 'Your bookmarked match highlights and live streams' 
                    : 'Stream latest highlights, full replays, and live sports broadcasts'}
                </p>
              </div>

              {(searchQuery || isLiveOnly || activeCategory !== 'All Sports' || activeView === 'saved') && (
                <button
                  onClick={() => {
                    setActiveCategory('All Sports');
                    setSearchQuery('');
                    setIsLiveOnly(false);
                    setActiveView('home');
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-4 cursor-pointer"
                >
                  Reset View
                </button>
              )}
            </div>

            {/* Video Grid */}
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div key={video.id} onClick={() => setSelectedVideo(video)}>
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                <p className="text-slate-400 font-bold text-sm">
                  {activeView === 'saved' 
                    ? 'No matches saved to your watchlist yet.' 
                    : 'No matches found.'}
                </p>
                {activeView === 'saved' && (
                  <button 
                    onClick={() => setActiveView('home')}
                    className="mt-3 px-4 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-emerald-400 transition-colors"
                  >
                    Explore Matches
                  </button>
                )}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}