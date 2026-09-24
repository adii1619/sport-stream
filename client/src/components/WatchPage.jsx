import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Volume2, Maximize, Eye, Clock, Bookmark, Share2, ThumbsUp } from 'lucide-react';

export default function WatchPage({ video, onBack, relatedVideos, onSelectVideo, isSaved, onToggleSave }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(12400);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-800 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Matches</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Watch Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Custom Video Player Box */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-2xl">
            {/* Player Overlay Mockup */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 flex flex-col justify-between p-4 z-10 opacity-100 group-hover:opacity-100 transition-opacity">
              {/* Top Bar inside Player */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-emerald-400">
                  {video.league}
                </span>
                <span className="text-slate-400 font-mono">1080p 60fps</span>
              </div>

              {/* Center Play Button */}
              <div className="self-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/30 transform hover:scale-110 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Controls Bar inside Player */}
              <div className="space-y-2">
                {/* Progress Bar */}
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div className={`h-full bg-emerald-500 transition-all duration-300 ${isPlaying ? 'w-1/3' : 'w-0'}`}></div>
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-emerald-400">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <Volume2 className="w-4 h-4" />
                    <span className="font-mono text-[11px] text-slate-400">04:12 / {video.duration}</span>
                  </div>
                  <Maximize className="w-4 h-4 cursor-pointer hover:text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Video Thumbnail Background */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Video Title & Actions */}
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div>
              <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-1">
                {video.teams.home} VS {video.teams.away}
              </div>
              <h1 className="text-lg md:text-xl font-bold text-white">{video.title}</h1>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800 text-xs font-bold text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-500" />
                  {video.views}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  {video.uploadedAt}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${hasLiked
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{likes.toLocaleString()}</span>
                </button>

                <button
                  onClick={onToggleSave}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${isSaved
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{isSaved ? 'Saved' : 'Watchlist'}</span>
                </button>

                <button className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Related Matches Queue */}
        <div className="space-y-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
            Related Match Highlights
          </h2>

          <div className="space-y-3">
            {relatedVideos
              .filter((v) => v.id !== video.id)
              .map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectVideo(rel)}
                  className="group flex gap-3 p-2 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800/60 hover:border-slate-700 cursor-pointer transition-all"
                >
                  <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-950 shrink-0">
                    <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-slate-950/90 text-[9px] font-mono font-bold text-slate-300">
                      {rel.duration}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between py-0.5 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider truncate">
                      {rel.teams.home} vs {rel.teams.away}
                    </span>
                    <h3 className="text-xs font-bold text-slate-200 line-clamp-2 leading-tight group-hover:text-emerald-400 transition-colors">
                      {rel.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">{rel.views}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}