import { useState, useEffect, useCallback } from 'react';
import type { CountryData, QuizQuestion, Score } from '@/types';
import { generateQuizQuestion, isAnswerCorrect } from '@/utils/quiz';
import { AUTO_ADVANCE_DELAY, MIN_COUNTRIES_REQUIRED } from '@/constants';

export const useQuiz = (countries: CountryData[]) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });

  // Generate quiz question
  const generateQuestion = useCallback(() => {
    if (countries.length < MIN_COUNTRIES_REQUIRED) return;

    const question = generateQuizQuestion(countries);
    if (question) {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [countries]);

  // Start quiz when data is loaded
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
    handleAnswerSelect
  };
};
