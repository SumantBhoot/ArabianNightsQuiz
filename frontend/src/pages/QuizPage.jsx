import { useState } from "react";
import { Filters } from "../components/quiz/Filters.jsx";
import { ProgressBar } from "../components/quiz/ProgressBar.jsx";
import { QuestionCard } from "../components/quiz/QuestionCard.jsx";
import { QuizResults } from "../components/quiz/QuizResults.jsx";
import { useQuiz } from "../components/quiz/useQuiz.js";

export default function QuizPage() {
  const [modes, setModes] = useState({ difficulty: "easy", story: "All Stories" });
  const {
    questions,
    current,
    currentIndex,
    selectedAnswer,
    showExplanation,
    score,
    loading,
    error,
    started,
    isComplete,
    history,
    timeLeft,
    start,
    select,
    submit,
    next,
    restart,
  } = useQuiz();

  function begin() {
    start({ difficulty: modes.difficulty, story: modes.story });
  }

  if (!started) {
    return <Filters modes={modes} setModes={setModes} onStart={begin} loading={loading} error={error} />;
  }

  if (isComplete) {
    return <QuizResults score={score} total={questions.length} history={history} onRestart={restart} />;
  }

  const currentResult = history[currentIndex];
  const correctIndex = currentResult ? currentResult.correctAnswer : null;

  return (
    <div className="grow self-stretch flex flex-col items-center gap-6 p-6 max-w-4xl mx-auto relative">
      <div className="w-full flex justify-between items-center text-desert-sand">
        <div className="text-lg font-display">Question {currentIndex + 1} of {questions.length}</div>
        <div className="text-lg font-bold font-display text-gold">Score: {score} / {questions.length}</div>
      </div>
      <ProgressBar current={currentIndex} total={questions.length} />
      {current && (
        <QuestionCard
          question={current}
          selectedIndex={selectedAnswer}
          onAnswer={select}
          submitted={showExplanation}
          correctIndex={correctIndex}
          timeLeft={timeLeft}
        />
      )}
      <div className="flex gap-4">
        {!showExplanation ? (
          <button
            onClick={() => submit()}
            disabled={selectedAnswer === null}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all hover:scale-105 shadow-lg"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={next}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold transition-all hover:scale-105 shadow-lg"
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}
