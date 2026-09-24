import React, { useState } from 'react';
import { Play, Eye, Clock, Tv } from 'lucide-react';

export default function VideoCard({ video }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-emerald-500/5">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        {!imgError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        ) : (
          /* Styled Fallback when image fails to load */
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
            <Tv className="w-8 h-8 text-emerald-500/60 mb-1" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {video.league}
            </span>
          </div>
        )}

        {/* Status Badge (LIVE vs HIGHLIGHTS) */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          {video.isLive ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-white text-[10px] font-black tracking-wider uppercase animate-pulse shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              LIVE NOW
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-black tracking-wider uppercase">
              {video.status}
            </span>
          )}
        </div>

        {/* League Tag Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 rounded bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-800 text-[10px] font-bold">
            {video.league}
          </span>
        </div>

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration Badge Bottom Right */}
        {!video.isLive && (
          <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded bg-slate-950/90 text-slate-200 text-[11px] font-mono font-bold border border-slate-800">
            {video.duration}
          </div>
        )}
      </div>

      {/* Card Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Matchup Header */}
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
            {video.teams.home} <span className="text-slate-500">VS</span> {video.teams.away}
          </div>

          {/* Video Title */}
          <h3 className="text-sm font-bold text-slate-100 line-clamp-2 group-hover:text-emerald-400 transition-colors leading-snug">
            {video.title}
          </h3>
        </div>

        {/* Meta Details */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-medium">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>{video.views}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{video.uploadedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}