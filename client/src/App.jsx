import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import WatchPage from './components/WatchPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Sports');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveOnly, setIsLiveOnly] = useState(false);
  const [activeView, setActiveView] = useState('home');

  // API State
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load saved video IDs from localStorage
  const [savedVideoIds, setSavedVideoIds] = useState(() => {
    const saved = localStorage.getItem('stadiumhub_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('stadiumhub_watchlist', JSON.stringify(savedVideoIds));
  }, [savedVideoIds]);

  // Fetch Videos from Express Backend
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== 'All Sports') params.append('category', activeCategory);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        if (isLiveOnly) params.append('isLive', 'true');

        const response = await fetch(`http://localhost:5000/api/videos?${params.toString()}`);
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos from server:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory, searchQuery, isLiveOnly]);

  const toggleSaveVideo = (videoId) => {
    setSavedVideoIds((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  // Filter watchlist items if in Watchlist view
  const displayedVideos = activeView === 'saved'
    ? videos.filter((v) => savedVideoIds.includes(v._id || v.id))
    : videos;

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
      {/* Header */}
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
            key={selectedVideo._id || selectedVideo.id}
            video={selectedVideo}
            onBack={() => setSelectedVideo(null)}
            relatedVideos={videos}
            onSelectVideo={(video) => setSelectedVideo(video)}
            isSaved={savedVideoIds.includes(selectedVideo._id || selectedVideo.id)}
            onToggleSave={() => toggleSaveVideo(selectedVideo._id || selectedVideo.id)}
          />
        ) : (
          <main className="flex-1 overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-800 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500">
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <span>{activeView === 'saved' ? 'Saved Watchlist' : activeCategory}</span>
                  <span className="text-xs font-bold text-slate-400 font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                    {displayedVideos.length} matches
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

            {/* Loading & Grid Rendering */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-64 bg-slate-900/40 border border-slate-800 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : displayedVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedVideos.map((video) => (
                  <div key={video._id || video.id} onClick={() => setSelectedVideo(video)}>
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
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}