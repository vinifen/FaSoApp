import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from '../../assets/locales/en.json';
import pt from '../../assets/locales/pt.json';

i18n.use(initReactI18next).init({

  lng: Localization.getLocales() ? 'pt' : 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
