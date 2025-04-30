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

      <View style={{
        height: 80,
      }}>
        <View style={{
          flex: 1, 
          justifyContent: 'space-around',   
          alignItems: 'flex-end'
        }}>
          <Feather
            name="menu"
            size={24}
            color={theme.secondary} 
            onPress={closeSidenav} 
          />
        </View>
      </View>
      
      <View style={{ 
        flex: 1,
        justifyContent: "center", 
        alignItems: "center" 
      }} >
        <MaterialCommunityIcons 
          name="account" 
          size={35} 
          color={theme.secondary} 
          
        />
        <Text 
          style={{color: theme.secondary}}
        >{t('hello_user')} Vinicius</Text>
      </View>
      
      <View style={{ flex: 7 }}>
        <View>
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
        >{t("rights_reserved")}</Text>
      </View>
    </View>
  )
}
