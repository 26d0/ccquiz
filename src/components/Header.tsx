import type { Language, Score, QuizMode } from '@/types';
import { getText } from '@/utils/texts';

interface HeaderProps {
  language: Language;
  score: Score;
  mode: QuizMode;
  hasToggledMode: boolean;
  onLanguageChange: () => void;
  onModeToggle: () => void;
}

export const Header = ({ language, score, mode, hasToggledMode, onLanguageChange, onModeToggle }: HeaderProps) => {
  const texts = getText(language);
  
  return (
    <header className="mb-8 text-center">
      <div className="relative mb-4">
        <h1 className="text-4xl font-bold text-gray-900 font-mono">
          ccQuiz
        </h1>
        <div className="mt-2">
          <button
            onClick={onModeToggle}
            className={`text-sm text-gray-600 hover:text-gray-900 underline ${language === 'ja' ? 'font-japanese' : ''}`}
          >
            {mode === 'normal' 
              ? (language === 'ja' ? `${!hasToggledMode ? ' ✨️' : ''}逆モードにする` : `${!hasToggledMode ? ' ✨️' : ''} Reverse Mode`)
              : (language === 'ja' ? '通常モードに戻す' : 'Normal Mode')
            }
          </button>
        </div>
        <div className="absolute top-0 right-0">
          <button
            onClick={onLanguageChange}
            className={`text-sm text-gray-600 hover:text-gray-900 underline ${language === 'ja' ? 'font-japanese' : ''}`}
          >
            {texts.switchLanguage}
          </button>
        </div>
      </div>
      <div className={`mt-4 text-sm text-gray-500 ${language === 'ja' ? 'font-japanese' : ''}`}>

        {texts.score}: {score.correct} / {score.total} 
        {score.total > 0 && ` (${Math.round((score.correct / score.total) * 100)}%)`}
      </div>
    </header>
  );
};
