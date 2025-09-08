import type { Language } from '@/types';
import { getText } from '@/utils/texts';

interface LoadingStateProps {
  language: Language;
  isError?: boolean;
}

export const LoadingState = ({ language, isError = false }: LoadingStateProps) => {
  const texts = getText(language);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className={`text-xl text-gray-600 dark:text-gray-400 ${language === 'ja' ? 'font-japanese' : ''}`}>
        {isError ? texts.failed : texts.loading}
      </div>
    </div>
  );
};
