import { useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './context';
import { ENABLED_LANGUAGES } from './config';
import en from './locales/en';
import es from './locales/es';
import ast from './locales/ast';

const LOCALES = { en, es, ast };
const STORAGE_KEY = 'wedding_lang';

function detectDefault() {
  // A personalised invite link can carry ?lang=es to land a guest straight
  // on that language, e.g. https://site/rsvp/their-slug?lang=es — this takes
  // priority so it works even for a guest's very first visit, before
  // anything's been stored yet.
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (ENABLED_LANGUAGES.includes(fromUrl)) return fromUrl;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (ENABLED_LANGUAGES.includes(stored)) return stored;
  return ENABLED_LANGUAGES[0];
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectDefault);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'ast' ? 'ast' : language;
  }, [language]);

  const setLanguage = (lang) => {
    if (ENABLED_LANGUAGES.includes(lang)) setLanguageState(lang);
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
