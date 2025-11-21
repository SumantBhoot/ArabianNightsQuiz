export function QuizResults({ score, total, history, onRestart }) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-display text-gold mb-4 drop-shadow-lg">Quiz Complete!</h2>
        <div className="text-3xl text-desert-sand">
          Score: <span className="font-bold text-gold">{score}</span> / {total}
        </div>
        <p className="text-xl mt-2 opacity-80">
          Accuracy: {total ? Math.round((score / total) * 100) : 0}%
        </p>
      </div>

      <div className="w-full space-y-6">
        <h3 className="text-3xl font-display text-center mb-6 border-b border-gold/30 pb-2">Review Answers</h3>
        {history.map((item, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm border border-gold/30 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h4 className="text-xl font-semibold text-desert-sand">
                {idx + 1}. {item.question.prompt}
              </h4>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.isCorrect ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'}`}>
                {item.isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            </div>
            
            <div className="grid gap-2 mb-4">
              {item.question.options.map((opt, optIdx) => {
                let className = "p-3 rounded-lg border transition-colors ";
                if (optIdx === item.correctAnswer) {
                  className += "bg-green-900/40 border-green-500 text-green-100";
                } else if (optIdx === item.userAnswer && !item.isCorrect) {
                  className += "bg-red-900/40 border-red-500 text-red-100";
                } else {
                  className += "bg-black/20 border-white/10 text-gray-300 opacity-60";
                }
                return (
                  <div key={optIdx} className={className}>
                    {opt}
                  </div>
                );
              })}
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg border-l-4 border-gold">
              <p className="text-sm text-gold font-bold mb-1">Explanation:</p>
              <p className="text-gray-200 italic">{item.explanation}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="mt-8 px-10 py-4 bg-gradient-to-r from-gold to-yellow-600 text-midnight rounded-full hover:scale-105 transition-transform text-xl font-bold shadow-xl border-2 border-white/20"
      >
        Start New Adventure
      </button>
    </div>
  );
}
