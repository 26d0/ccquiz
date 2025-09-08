export interface CountryData {
  ccTLD: string;
  countryEN: string;
  countryJP: string;
}

export interface QuizQuestion {
  correctAnswer: CountryData;
  options: CountryData[];
}

export type Language = 'en' | 'ja';

export type QuizMode = 'normal' | 'reverse';

export interface Score {
  correct: number;
  total: number;
}
