import type { Language, QuizQuestion, QuizMode } from '@/types';
import { getText } from '@/utils/texts';

interface QuizQuestionProps {
  question: QuizQuestion;
  language: Language;
  mode: QuizMode;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (index: number) => void;
}

export const QuizQuestionComponent = ({
  question,
  language,
  mode,
  selectedAnswer,
  showResult,
  onAnswerSelect
}: QuizQuestionProps) => {
  const texts = getText(language);

  const getQuestionText = () => {
    if (mode === 'normal') {
      return language === 'ja' 
        ? (
          <>
            <span className="font-mono bg-surface-variant text-foreground px-2 py-1 border border-border">{question.correctAnswer.ccTLD}</span> 
            {texts.questionSuffix}
          </>
        )
        : (
          <>
            {texts.question} <span className="font-mono bg-surface-variant text-foreground px-2 py-1 border border-border">{question.correctAnswer.ccTLD}</span>
            {texts.questionSuffix}
          </>
        );
    } else {
      return language === 'ja' 
        ? (
          <>
            <span className="bg-surface-variant text-foreground px-2 py-1 border border-border">{question.correctAnswer.countryJP}</span>
            {texts.reverseQuestionSuffix}
          </>
        )
        : (
          <>
            {texts.reverseQuestionPrefix} <span className="bg-surface-variant text-foreground px-2 py-1 border border-border">{question.correctAnswer.countryEN}</span>
            {texts.reverseQuestionSuffix}
          </>
        );
    }
  };

  return (
    <div className="bg-surface border-2 border-border p-6 shadow-sm">
      <h2 className={`text-2xl font-semibold text-center mb-6 text-foreground ${language === 'ja' ? 'font-japanese' : ''}`}>
        {getQuestionText()}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showResult}
            className={`w-full p-4 text-left border-2 transition-all duration-200 cursor-pointer ${
              showResult
                ? option.ccTLD === question.correctAnswer.ccTLD
                  ? 'bg-accent text-background border-accent shadow-md'
                  : selectedAnswer === index
                  ? 'bg-surface-variant border-muted text-muted'
                  : 'bg-surface border-border text-muted opacity-60'
                : selectedAnswer === index
                ? 'bg-surface-variant border-accent text-foreground shadow-sm'
                : 'bg-surface border-border hover:bg-surface-variant hover:border-muted text-foreground'
            }`}
          >
            <div className={`font-medium ${language === 'ja' ? 'font-japanese' : ''}`}>
              {mode === 'normal' 
                ? (language === 'ja' ? option.countryJP : option.countryEN)
                : option.ccTLD
              }
            </div>
          </button>
        ))}
      </div>
      
      {showResult && selectedAnswer !== null && (
        <div className="mt-6 text-center">
          <div className={`text-lg font-semibold mb-4 ${
            question.options[selectedAnswer].ccTLD === question.correctAnswer.ccTLD
              ? 'text-accent'
              : 'text-muted'
          } ${language === 'ja' ? 'font-japanese' : ''}`}>
            {question.options[selectedAnswer].ccTLD === question.correctAnswer.ccTLD
              ? texts.correct
              : texts.incorrect}
          </div>
        </div>
      )}
    </div>
  );
};
