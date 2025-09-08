import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import type { Language } from '@/types';
import { COOKIE_EXPIRY_DAYS } from '@/constants';

export const useLanguage = () => {
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
    Cookies.set('quiz-language', newLanguage, { expires: COOKIE_EXPIRY_DAYS });
  };

  return { language, changeLanguage };
};
