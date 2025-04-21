import { View, Text, Button } from 'react-native'
import React from 'react'
import i18n from '../../i18n';
import { useTheme } from '../../hook/useTheme';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const {t, i18n} = useTranslation();
  const {theme, setTheme} = useTheme();
  const exchangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }
  const exchangeLocale = () => {
    const newLocale = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLocale);
  };
  return (
    <View>
      <Text style={{color: theme.primary}}>{t("welcome")}</Text>
      <Button title={t("change_theme")} onPress={exchangeTheme}></Button>
      <Button title={t("change_locale")} onPress={exchangeLocale}></Button>

    </View>
  )
}