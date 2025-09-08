import type { Language } from '@/types';

export const texts = {
  en: {
    score: 'Score',
    loading: 'Loading quiz data...',
    failed: 'Failed to load quiz data',
    question: 'Which country uses',
    correct: '🎉 Correct!',
    incorrect: '❌ Incorrect!',
    switchLanguage: '日本語',
  },
  ja: {
    score: 'スコア',
    loading: 'クイズデータを読み込み中...',
    failed: 'クイズデータの読み込みに失敗しました',
    question: 'ccTLD',
    correct: '🎉 正解!',
    incorrect: '❌ 不正解!',
    switchLanguage: 'English',
  }
} as const;

export const getText = (language: Language) => texts[language];
