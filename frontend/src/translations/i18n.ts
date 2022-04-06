import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import langEn from './en.json';
import langFr from './fr.json';

i18n
    .use(initReactI18next)
    .init({
        lng: 'fr',
        fallbackLng: 'fr',
        debug: process.env.NODE_ENV !== 'production',
        keySeparator: false,
        resources: {
            en: { translation: langEn },
            fr: { translation: langFr },
        },
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
