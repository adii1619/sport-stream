import React, { useState } from 'react';
import { X, PlusCircle, AlertCircle } from 'lucide-react';

export default function AddVideoModal({ isOpen, onClose, onVideoAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    sport: 'Football',
    league: '',
    homeTeam: '',
    awayTeam: '',
    status: 'HIGHLIGHTS',
    duration: '10:00',
    thumbnail: '',
    isLive: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const savedUserData = localStorage.getItem('stadiumhub_user');
    const token = savedUserData ? JSON.parse(savedUserData).token : '';

    try {
      const response = await fetch('http://localhost:5000/api/videos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create video stream');
      }

      onVideoAdded(data);
      onClose();
      setFormData({
        title: '',
        sport: 'Football',
        league: '',
        homeTeam: '',
        awayTeam: '',
        status: 'HIGHLIGHTS',
        duration: '10:00',
        thumbnail: '',
        isLive: false,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 mb-3">
            <PlusCircle className="w-6 h-6 text-slate-950 font-extrabold" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-wider text-white">
            Add New <span className="text-emerald-400">Match Stream</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Seed a new sports match directly into your MongoDB database
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Match Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Arsenal vs Chelsea | Premier League Derby"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Sport Category</label>
              <select
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Tennis">Tennis</option>
                <option value="Formula 1">Formula 1</option>
                <option value="Basketball">Basketball</option>
                <option value="MMA / Boxing">MMA / Boxing</option>
                <option value="Esports">Esports</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">League / Tournament</label>
              <input
                type="text"
                required
                value={formData.league}
                onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                placeholder="e.g. Premier League"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Home Team / Player</label>
              <input
                type="text"
                required
                value={formData.homeTeam}
                onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                placeholder="e.g. Arsenal"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Away Team / Player</label>
              <input
                type="text"
                required
                value={formData.awayTeam}
                onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                placeholder="e.g. Chelsea"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Stream Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="LIVE">LIVE</option>
                <option value="HIGHLIGHTS">HIGHLIGHTS</option>
                <option value="FULL MATCH">FULL MATCH</option>
                <option value="REPLAY">REPLAY</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Duration</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 14:20 or LIVE"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Thumbnail Image URL</label>
            <input
              type="url"
              required
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="isLive"
              checked={formData.isLive}
              onChange={(e) => setFormData({ ...formData, isLive: e.target.checked, status: e.target.checked ? 'LIVE' : formData.status })}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
            <label htmlFor="isLive" className="text-xs font-bold text-slate-300 cursor-pointer">
              Mark as Active Live Stream
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-black uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all mt-2"
          >
            {loading ? 'Adding to Database...' : 'Add Stream to Database'}
          </button>
        </form>
      </div>
    </div>
  );
}