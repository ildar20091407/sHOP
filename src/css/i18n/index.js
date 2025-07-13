import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

import en from '../locales/en/translation.json'
import ru from '../locales/ru/translation.json'

i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
        },
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['navigator', 'localStorage', 'htmlTag'], 
            caches: ['localStorage'], 
        }
})

export default i18n