import { useState, useEffect, useCallback } from 'react';
import type { CountryData, QuizQuestion, Score, QuizMode } from '@/types';
import { generateQuizQuestion, isAnswerCorrect } from '@/utils/quiz';
import { AUTO_ADVANCE_DELAY, MIN_COUNTRIES_REQUIRED } from '@/constants';

export const useQuiz = (countries: CountryData[]) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });
  const [mode, setMode] = useState<QuizMode>('normal');
  const [hasToggledMode, setHasToggledMode] = useState(false);

  // Check if user has toggled mode before on component mount
  useEffect(() => {
    const hasToggled = document.cookie
      .split('; ')
      .find(row => row.startsWith('mode-toggled='))
      ?.split('=')[1] === 'true';
    setHasToggledMode(hasToggled);
  }, []);

  // Generate quiz question
  const generateQuestion = useCallback(() => {
    if (countries.length < MIN_COUNTRIES_REQUIRED) return;

    const question = generateQuizQuestion(countries, mode);
    if (question) {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [countries, mode]);

  // Toggle quiz mode
  const toggleMode = () => {
    setMode(prev => prev === 'normal' ? 'reverse' : 'normal');
    setScore({ correct: 0, total: 0 }); // Reset score when changing mode
    
    // Set cookie to remember that user has toggled mode
    if (!hasToggledMode) {
      document.cookie = 'mode-toggled=true; path=/; max-age=31536000'; // 1 year
      setHasToggledMode(true);
    }
  };

  // Start quiz when data is loaded or mode changes
  useEffect(() => {
    if (countries.length > 0) {
      generateQuestion();
    }
  }, [countries, generateQuestion]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult || !currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const correct = isAnswerCorrect(currentQuestion, answerIndex);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
  };

  // Auto-advance to next question after delay
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        generateQuestion();
      }, AUTO_ADVANCE_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [showResult, generateQuestion]);

  return {
    currentQuestion,
    selectedAnswer,
    showResult,
    score,
    mode,
    hasToggledMode,
    handleAnswerSelect,
    toggleMode
  };
};
