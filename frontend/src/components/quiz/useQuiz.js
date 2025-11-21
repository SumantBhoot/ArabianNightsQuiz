import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function shuffleOptions(options) {
  const withIndex = options.map((opt, i) => ({ text: opt, originalIndex: i }));
  for (let i = withIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [withIndex[i], withIndex[j]] = [withIndex[j], withIndex[i]];
  }
  return {
    options: withIndex.map(o => o.text),
    originalIndices: withIndex.map(o => o.originalIndex)
  };
}

export function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizParams, setQuizParams] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    let timer;
    if (started && !showExplanation && !loading && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showExplanation && started) {
      submit(-1); // Auto-submit with invalid index
    }
    return () => clearInterval(timer);
  }, [started, showExplanation, loading, timeLeft]);

  // Submit score when quiz completes
  useEffect(() => {
    if (started && currentIndex === questions.length - 1 && showExplanation) {
      submitScore();
    }
  }, [started, currentIndex, showExplanation]);

  async function submitScore() {
    // Do not attempt submission if token missing
    if (!token) return;
    try {
      await api.submitScore({
        score: score,
        total_questions: questions.length,
        story: quizParams.story,
        difficulty: quizParams.difficulty
      }, token);
    } catch (e) {
      console.error("Failed to submit score", e);
    }
  }

  async function start({ difficulty, story }) {
    setLoading(true);
    setError(null);
    setQuizParams({ difficulty, story });
    try {
      const params = { difficulty };
      if (story && story !== "All Stories") params.story = story;
      const data = await api.getQuestions(params);
      if (!data.questions || data.questions.length === 0) {
        setError("No questions found for selected filters");
        return;
      }

      const processedQuestions = data.questions.map(q => {
        const shuffled = shuffleOptions(q.options);
        return {
          ...q,
          options: shuffled.options,
          originalIndices: shuffled.originalIndices
        };
      });

      setQuestions(processedQuestions);
      setCurrentIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setHistory([]);
      setTimeLeft(30);
      setStarted(true);
    } catch (e) {
      setError(e.message || "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }

  function select(idx) {
    if (showExplanation) return;
    setSelectedAnswer(idx);
  }

  async function submit(forcedAnswer = null) {
    const answerToSubmit = forcedAnswer !== null ? forcedAnswer : selectedAnswer;
    
    // Allow submission if time is up (forcedAnswer is -1) or if user selected an answer
    if (answerToSubmit === null && timeLeft > 0) return;

    try {
      const q = questions[currentIndex];
      // If time ran out (answerToSubmit is -1), we still want to know the correct answer
      const originalIndex = (answerToSubmit !== -1 && answerToSubmit !== null)
        ? q.originalIndices[answerToSubmit]
        : -1;

      const res = await api.checkAnswer({ question_id: q.id, answer_index: originalIndex });
      
      if (res.correct) setScore(s => s + 1);
      
      const visualCorrectIndex = q.originalIndices.indexOf(res.correct_answer);

      setHistory(prev => [...prev, {
        question: q,
        userAnswer: answerToSubmit,
        correctAnswer: visualCorrectIndex,
        explanation: res.explanation,
        isCorrect: res.correct
      }]);

      setShowExplanation(true);
    } catch (e) {
      console.error(e);
    }
  }

  function next() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    }
  }

  function restart() {
    setStarted(false);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setError(null);
    setHistory([]);
    setTimeLeft(30);
  }

  const isComplete = started && currentIndex === questions.length - 1 && showExplanation;
  const current = questions[currentIndex];

  return {
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
  };
}
