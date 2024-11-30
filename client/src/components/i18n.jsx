// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import hiTranslations from './translations/hi.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    hi: { translation: hiTranslations },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // If the chosen language is not available, fall back to English
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
