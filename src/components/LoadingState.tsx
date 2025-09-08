import type { Language } from '@/types';
import { getText } from '@/utils/texts';

interface LoadingStateProps {
  language: Language;
  isError?: boolean;
}

export const LoadingState = ({ language, isError = false }: LoadingStateProps) => {
  const texts = getText(language);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className={`text-xl text-muted ${language === 'ja' ? 'font-japanese' : ''}`}>
        {isError ? texts.failed : texts.loading}
      </div>
    </div>
  );
};
