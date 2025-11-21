export function QuestionCard({ question, selectedIndex, onAnswer, submitted, correctIndex, timeLeft }) {
  if (!question) return null;

  const timerColor = timeLeft < 10 ? "text-red-500" : "text-gold";

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-midnight/80 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-gold/50 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm uppercase tracking-widest text-gold/80 font-bold">
          {question.difficulty} • {question.story}
        </div>
        <div className={`text-2xl font-bold font-mono ${timerColor} border-2 border-current px-3 py-1 rounded-lg`}>
          {timeLeft}s
        </div>
      </div>

      <h2 className="text-3xl font-display text-desert-sand mb-8 leading-relaxed">
        {question.prompt}
      </h2>
      <div className="grid gap-4">
        {question.options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = submitted && correctIndex === idx;
          const isWrong = submitted && isSelected && correctIndex !== idx;
          
          let baseStyle = "text-left px-6 py-4 rounded-xl border-2 transition-all text-lg font-medium relative overflow-hidden group ";
          
          if (isCorrect) {
            baseStyle += "bg-green-900/50 border-green-500 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
          } else if (isWrong) {
            baseStyle += "bg-red-900/50 border-red-500 text-red-100";
          } else if (isSelected) {
            baseStyle += "bg-blue-900/50 border-blue-400 text-blue-100 shadow-[0_0_15px_rgba(96,165,250,0.3)] scale-[1.02]";
          } else {
            baseStyle += "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-gold/50 hover:text-gold";
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => onAnswer(idx)}
              className={baseStyle}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full border ${isSelected || isCorrect || isWrong ? 'border-current' : 'border-white/30 group-hover:border-gold'} text-sm`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
      {submitted && (
        <div className="mt-6 p-4 rounded-xl bg-gold/10 border border-gold/30 text-desert-sand animate-in fade-in slide-in-from-bottom-4">
          <strong className="text-gold block mb-1">Wisdom of the Ages:</strong> 
          {question.explanation}
        </div>
      )}
    </div>
  );
}
