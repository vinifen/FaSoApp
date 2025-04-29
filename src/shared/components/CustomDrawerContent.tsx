import { View, Text} from 'react-native'
import React from 'react'
import { useTheme } from '../hook/useTheme'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import DrawerButton from './buttons/DrawerButton'
import { useRouter } from 'expo-router';

export default function CustomDrawerContent() {

  const {t, i18n} = useTranslation();
  const { theme, setTheme, currentlyTheme } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();


  const closeSidenav = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  
  const toggleLocale = () => {
    const newLocale = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLocale);
  };


  return (
    <View style={{ flex: 1, backgroundColor: theme.primary}}>

      <View style={{flex: 1.1}} className='justify-center'>
        <Feather
          name="menu"
          size={24}
          color={theme.secondary} 
          className='ml-5'
          onPress={closeSidenav} 
        />
      </View>
      
      <View style={{ flex: 1 }} className='justify-end items-center'>
        <MaterialCommunityIcons 
          name="account" 
          size={35} 
          color={theme.secondary} 
          className='mb-2'
        />
        <Text 
          style={{color: theme.secondary}}
          className='text-lg'
        >{t('hello_user')} Vinicius</Text>
      </View>
      
      <View style={{ flex: 7 }} className='mx-4 justify-between'>
        <View className='justify-between h-48 mt-6'>
          <DrawerButton title={"Login"} onPress={() => router.push('/login/indexLogin')}/>
          <DrawerButton title={t('register')} onPress={() => router.push('/register/indexRegister')}/>
          <DrawerButton 
            title={`${currentlyTheme === "light" ? t("light_theme") : (t("dark_theme"))}`} 
            onPress={toggleTheme} 
          />
          <DrawerButton 
            title={t('language') + `: ${i18n.language === "en" ? t("english") : t("portuguese")}`} 
            onPress={toggleLocale} 
          />
        </View>
        <Text 
          style={{color: theme.secondary}}
          className='text-xs mb-2 text-center'
        >{t("rights_reserved")}</Text>
      </View>
    </View>
  )
}
