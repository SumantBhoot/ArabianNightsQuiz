export function ProgressBar({ current, total }) {
  if (total === 0) return null;
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full max-w-2xl mx-auto my-4">
      <div className="flex justify-between mb-2 text-sm font-bold text-gold font-display tracking-wider">
        <span>Question {current + 1} / {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-midnight/50 border border-gold/30 rounded-full h-4 overflow-hidden backdrop-blur-sm shadow-inner">
        <div
          className="h-full bg-linear-to-r from-gold to-yellow-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(217,164,65,0.5)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
