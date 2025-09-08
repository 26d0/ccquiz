import type { CountryData, QuizQuestion, QuizMode } from '@/types';
import { QUIZ_OPTIONS_COUNT } from '@/constants';

export const generateQuizQuestion = (countries: CountryData[], _mode: QuizMode = 'normal'): QuizQuestion | null => {
  if (countries.length < QUIZ_OPTIONS_COUNT) return null;

  const correctAnswer = countries[Math.floor(Math.random() * countries.length)];
  const options = [correctAnswer];
  
  // Add 3 random wrong answers
  while (options.length < QUIZ_OPTIONS_COUNT) {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    if (!options.some(option => option.ccTLD === randomCountry.ccTLD)) {
      options.push(randomCountry);
    }
  }
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // The quiz structure is the same for both normal and reverse modes
  // The mode affects only the display in the UI components
  return { correctAnswer, options };
};

export const isAnswerCorrect = (
  question: QuizQuestion,
  answerIndex: number
): boolean => {
  return question.options[answerIndex].ccTLD === question.correctAnswer.ccTLD;
};
