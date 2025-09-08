
'use client';

import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

// Constants
const AUTO_ADVANCE_DELAY = 2000; // 3 seconds

interface CountryData {
  ccTLD: string;
  countryEN: string;
  countryJP: string;
}

interface QuizQuestion {
  correctAnswer: CountryData;
  options: CountryData[];
}

type Language = 'en' | 'ja';

export default function Home() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

  // Load language from cookie on mount
  useEffect(() => {
    const savedLanguage = Cookies.get('quiz-language') as Language;
    if (savedLanguage === 'en' || savedLanguage === 'ja') {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to cookie when changed
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    Cookies.set('quiz-language', newLanguage, { expires: 365 });
  };

  // Text content for different languages
  const texts = {
    en: {
      score: 'Score',
      loading: 'Loading quiz data...',
      failed: 'Failed to load quiz data',
      question: 'Which country uses',
      correct: '🎉 Correct!',
      incorrect: '❌ Incorrect!',
    },
    ja: {
      score: 'スコア',
      loading: 'クイズデータを読み込み中...',
      failed: 'クイズデータの読み込みに失敗しました',
      question: 'ccTLD',
      correct: '🎉 正解!',
      incorrect: '❌ 不正解!',
    }
  };

  // Load CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/country_cctld.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');
        const parsedData: CountryData[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const [ccTLD, countryEN, countryJP] = line.split(',');
            parsedData.push({
              ccTLD: ccTLD.trim(),
              countryEN: countryEN.trim(),
              countryJP: countryJP.trim()
            });
          }
        }
        
        setCountries(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading CSV:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Generate quiz question
  const generateQuestion = useCallback(() => {
    if (countries.length < 4) return;

    const correctAnswer = countries[Math.floor(Math.random() * countries.length)];
    const options = [correctAnswer];
    
    // Add 3 random wrong answers
    while (options.length < 4) {
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

    setCurrentQuestion({ correctAnswer, options });
    setSelectedAnswer(null);
    setShowResult(false);
  }, [countries]);

  // Start quiz when data is loaded
  useEffect(() => {
    if (countries.length > 0) {
      generateQuestion();
    }
  }, [countries, generateQuestion]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = currentQuestion?.options[answerIndex].ccTLD === currentQuestion?.correctAnswer.ccTLD;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  // Auto-advance to next question after 3 seconds
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        generateQuestion();
      }, AUTO_ADVANCE_DELAY);
      
      return () => clearTimeout(timer);
    }
  }, [showResult, generateQuestion]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">{texts[language].loading}</div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">{texts[language].failed}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      <header className="mb-8 text-center">
        <div className="relative mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            ccQuiz
          </h1>
          <button
            onClick={() => changeLanguage(language === 'en' ? 'ja' : 'en')}
            className="absolute top-0 right-0 text-sm text-gray-600 hover:text-gray-900 underline"
          >
            {language === 'en' ? '日本語' : 'English'}
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          {texts[language].score}: {score.correct} / {score.total} 
          {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {language === 'ja' 
              ? <><span className="font-mono bg-gray-200 px-2 py-1 rounded">{currentQuestion.correctAnswer.ccTLD}</span> はどこの国?</>
              : <>{texts[language].question} <span className="font-mono bg-gray-200 px-2 py-1 rounded">{currentQuestion.correctAnswer.ccTLD}</span>?</>
            }
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  showResult
                    ? option.ccTLD === currentQuestion.correctAnswer.ccTLD
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : selectedAnswer === index
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                    : selectedAnswer === index
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">
                  {language === 'ja' ? option.countryJP : option.countryEN}
                </div>
              </button>
            ))}
          </div>
          
          {showResult && (
            <div className="mt-6 text-center">
              <div className={`text-lg font-semibold mb-4 ${
                currentQuestion.options[selectedAnswer!].ccTLD === currentQuestion.correctAnswer.ccTLD
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {currentQuestion.options[selectedAnswer!].ccTLD === currentQuestion.correctAnswer.ccTLD
                  ? texts[language].correct
                  : texts[language].incorrect}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}