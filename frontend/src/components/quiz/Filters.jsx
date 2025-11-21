const DIFFICULTIES = ["easy", "medium", "hard"];
const STORIES = [
  "All Stories",
  "Aladdin",
  "Ali Baba",
  "Sinbad",
  "Scheherazade",
  "The Fisherman & the Jinni",
  "The Porter & the Three Ladies",
  "The Ebony Horse",
  "The Merchant & the Demon",
  "Various Tales",
];

export function Filters({ modes, setModes, onStart, loading, error }) {
  function changeDifficulty(e) {
    setModes({ ...modes, difficulty: e.target.value });
  }
  function changeStory(e) {
    setModes({ ...modes, story: e.target.value });
  }

  return (
    <div className="grow self-stretch flex flex-col justify-center items-center gap-8 text-2xl p-8 max-w-4xl mx-auto">
      
      <div className="flex flex-col items-center gap-8 w-full bg-midnight/80 backdrop-blur-md p-10 rounded-3xl border-2 border-gold/30 shadow-2xl">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-display font-bold text-3xl text-desert-sand text-center">Select Difficulty</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                className={`font-display text-xl px-6 py-3 rounded-xl transition-all duration-300 border-2 ${
                  modes.difficulty === d
                    ? "bg-gold text-midnight border-gold shadow-[0_0_15px_rgba(217,164,65,0.5)] scale-105 font-bold"
                    : "bg-transparent text-desert-sand border-gold/30 hover:border-gold hover:bg-gold/10"
                }`}
                onClick={changeDifficulty}
                value={d}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="font-display font-bold text-3xl text-desert-sand">Choose a Tale</h2>
          <div className="relative w-full max-w-md group">
            <select
              value={modes.story}
              onChange={changeStory}
              className="w-full appearance-none bg-midnight border-2 border-gold/30 text-desert-sand px-6 py-4 pr-12 rounded-xl text-xl focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(217,164,65,0.3)] transition-all cursor-pointer hover:border-gold/60"
            >
              {STORIES.map((s) => (
                <option key={s} value={s} className="bg-midnight text-desert-sand py-2">{s}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold transition-transform group-hover:scale-110">
              ▼
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          disabled={loading}
          className="mt-8 px-12 py-4 bg-linear-to-r from-gold to-yellow-600 text-midnight rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(217,164,65,0.6)] disabled:opacity-50 disabled:scale-100 transition-all text-2xl font-bold font-display border-2 border-white/20"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Summoning Djinn...
            </span>
          ) : (
            "Begin Journey"
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-900/80 border border-red-500 text-red-100 px-6 py-4 rounded-xl text-lg mt-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
