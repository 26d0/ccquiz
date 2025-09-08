
'use client';

import { useCountriesData, useLanguage, useQuiz } from '@/hooks';
import { Header, QuizQuestionComponent, LoadingState } from '@/components';

export default function Home() {
  const { countries, loading, error } = useCountriesData();
  const { language, changeLanguage } = useLanguage();
  const { currentQuestion, selectedAnswer, showResult, score, mode, hasToggledMode, handleAnswerSelect, toggleMode } = useQuiz(countries);

  if (loading) {
    return <LoadingState language={language} />;
  }

  if (error || !currentQuestion) {
    return <LoadingState language={language} isError />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
      <Header 
        language={language}
        score={score}
        mode={mode}
        hasToggledMode={hasToggledMode}
        onLanguageChange={() => changeLanguage(language === 'en' ? 'ja' : 'en')}
        onModeToggle={toggleMode}
      />
      
      <main className="max-w-2xl mx-auto">
        <QuizQuestionComponent
          question={currentQuestion}
          language={language}
          mode={mode}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={handleAnswerSelect}
        />
      </main>
    </div>
  );
}