import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishJson from './locales/en.json';
import ptJson from './locales/pt.json';
import esJson from './locales/es.json';

const resources = {
  en: { translation: englishJson },
  pt: { translation: ptJson },
  es: { translation: esJson },
};

const storedLang = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: storedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
