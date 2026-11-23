import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

export const LANGUAGES = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]['code'];

const STORAGE_KEY = 'language';
const FALLBACK: LanguageCode = 'en';

function isSupported(code: string | null | undefined): code is LanguageCode {
  return LANGUAGES.some((language) => language.code === code);
}

function detectLanguage(): LanguageCode {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isSupported(stored)) return stored;

  const browser = navigator.language.slice(0, 2).toLowerCase();
  return isSupported(browser) ? browser : FALLBACK;
}

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
});

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
  },
  lng: detectLanguage(),
  fallbackLng: FALLBACK,
  interpolation: { escapeValue: false },
});

export function changeLanguage(language: LanguageCode) {
  localStorage.setItem(STORAGE_KEY, language);
  void i18n.changeLanguage(language);
}

export default i18n;
