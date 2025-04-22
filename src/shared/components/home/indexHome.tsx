import { View, Text, Button } from 'react-native'
import React from 'react'
import { useTheme } from '../../hook/useTheme';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const {t, i18n} = useTranslation();
  const {theme, setTheme} = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  const toggleLocale = () => {
    const newLocale = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLocale);
  };
  
  return (
    <View style={{backgroundColor: theme.background}} className='h-full justify-center'>
      <Text style={{color: theme.secundary}}>{t("welcome")}</Text>
      <Button title={t("change_theme")} onPress={toggleTheme}></Button>
      <Button title={t("change_locale")} onPress={toggleLocale}></Button>
    </View>
  )
}