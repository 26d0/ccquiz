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
            <span className="font-mono bg-gray-200 px-2 py-1">{question.correctAnswer.ccTLD}</span> 
            {texts.questionSuffix}
          </>
        )
        : (
          <>
            {texts.question} <span className="font-mono bg-gray-200 px-2 py-1">{question.correctAnswer.ccTLD}</span>
            {texts.questionSuffix}
          </>
        );
    } else {
      return language === 'ja' 
        ? (
          <>
            <span className="bg-gray-200 px-2 py-1">{question.correctAnswer.countryJP}</span>
            {texts.reverseQuestionSuffix}
          </>
        )
        : (
          <>
            {texts.reverseQuestionPrefix} <span className="bg-gray-200 px-2 py-1">{question.correctAnswer.countryEN}</span>
            {texts.reverseQuestionSuffix}
          </>
        );
    }
  };

  return (
    <div className="bg-white border-2 border-gray-400 p-6">
      <h2 className={`text-2xl font-semibold text-center mb-6 ${language === 'ja' ? 'font-japanese' : ''}`}>
        {getQuestionText()}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showResult}
            className={`w-full p-4 text-left border-2 transition-colors cursor-pointer ${
              showResult
                ? option.ccTLD === question.correctAnswer.ccTLD
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : selectedAnswer === index
                  ? 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-gray-100 border-gray-300 text-gray-600'
                : selectedAnswer === index
                ? 'bg-blue-100 border-blue-500'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
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
              ? 'text-green-600'
              : 'text-red-600'
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
