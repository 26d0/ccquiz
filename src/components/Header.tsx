import type { Language, Score } from '@/types';
import { getText } from '@/utils/texts';

interface HeaderProps {
  language: Language;
  score: Score;
  onLanguageChange: () => void;
}

export const Header = ({ language, score, onLanguageChange }: HeaderProps) => {
  const texts = getText(language);
  
  return (
    <header className="mb-8 text-center">
      <div className="relative mb-4">
        <h1 className="text-4xl font-bold text-gray-900 font-mono">
          ccQuiz
        </h1>
        <button
          onClick={onLanguageChange}
          className={`absolute top-0 right-0 text-sm text-gray-600 hover:text-gray-900 underline ${language === 'ja' ? 'font-japanese' : ''}`}
        >
          {texts.switchLanguage}
        </button>
      </div>
      <div className={`mt-4 text-sm text-gray-500 ${language === 'ja' ? 'font-japanese' : ''}`}>
        {texts.score}: {score.correct} / {score.total} 
        {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
      </div>
    </header>
  );
};
