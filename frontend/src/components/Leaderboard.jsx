import { useState, useEffect } from "react";
import { api } from "../services/api";

export function Leaderboard({ onClose }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all");
  const [storyFilter, setStoryFilter] = useState("All Stories");
  const [stories, setStories] = useState(["All Stories"]);

  useEffect(() => {
    loadStories();
    loadLeaderboard();
  }, [timeFilter, storyFilter]);

  async function loadStories() {
    try {
      const data = await api.getStories();
      setStories(["All Stories", ...data.stories]);
    } catch (e) {
      console.error("Failed to load stories", e);
    }
  }

  async function loadLeaderboard() {
    setLoading(true);
    try {
      const params = { time: timeFilter };
      if (storyFilter !== "All Stories") params.story = storyFilter;
      
      const data = await api.getLeaderboard(params);
      setScores(data.leaderboard);
    } catch (e) {
      console.error("Failed to load leaderboard", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-midnight/90 border-2 border-gold/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gold/30 flex justify-between items-center bg-gradient-to-r from-midnight to-[#1a3a5a]">
          <h2 className="text-4xl font-display text-gold drop-shadow-md">Royal Hall of Fame</h2>
          <button 
            onClick={onClose}
            className="text-gold/70 hover:text-gold text-3xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 flex gap-4 bg-white/5 border-b border-gold/10 flex-wrap">
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-midnight border border-gold/30 text-desert-sand rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
          >
            <option value="all">All Time Legends</option>
            <option value="weekly">Weekly Heroes</option>
          </select>

          <select 
            value={storyFilter}
            onChange={(e) => setStoryFilter(e.target.value)}
            className="bg-midnight border border-gold/30 text-desert-sand rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
          >
            {stories.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-6 grow custom-scrollbar">
          {loading ? (
            <div className="text-center text-gold/50 py-10 animate-pulse">Consulting the scrolls...</div>
          ) : scores.length === 0 ? (
            <div className="text-center text-desert-sand/50 py-10 italic">No legends recorded yet. Be the first!</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gold/60 border-b border-gold/20 text-sm uppercase tracking-wider">
                  <th className="pb-3 pl-2">Rank</th>
                  <th className="pb-3">Traveler</th>
                  <th className="pb-3 text-right">Score</th>
                  <th className="pb-3 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-desert-sand">
                {scores.map((entry, idx) => (
                  <tr key={idx} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                    <td className="py-4 pl-2 font-bold text-gold/80">
                      {idx === 0 ? '👑' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </td>
                    <td className="py-4 font-display text-lg group-hover:text-gold transition-colors">
                      {entry.username}
                    </td>
                    <td className="py-4 text-right font-mono font-bold text-gold">
                      {entry.score} <span className="text-xs text-gray-400 font-normal">/ {entry.total}</span>
                    </td>
                    <td className="py-4 text-right text-sm opacity-60">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
