import { useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './context';
import en from './locales/en';
import es from './locales/es';
import ast from './locales/ast';

const LOCALES = { en, es, ast };
const STORAGE_KEY = 'wedding_lang';
const SUPPORTED = ['en', 'es', 'ast'];

function detectDefault() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED.includes(stored)) return stored;
  const browser = (navigator.language || 'en').toLowerCase();
  if (browser.startsWith('es')) return 'es';
  return 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectDefault);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'ast' ? 'ast' : language;
  }, [language]);

  const setLanguage = (lang) => {
    if (SUPPORTED.includes(lang)) setLanguageState(lang);
  };

  const value = useMemo(
    () => ({ language, setLanguage, t: LOCALES[language] }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
