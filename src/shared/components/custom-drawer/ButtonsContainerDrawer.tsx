import { ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import Flex from '../Flex'
import { t } from 'i18next'
import i18n from '../../i18n'
import DrawerButton from '../buttons/DrawerButton'
import { useRouter } from 'expo-router'
import useTheme from 'shared/hooks/useTheme'
import { useSegments } from 'expo-router'
import useUserStore from 'shared/store/userStore'
import useUser from 'shared/hooks/useUser'
import userModel from 'shared/model/userModel'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ButtonsContainerDrawer({ style }: {style?: StyleProp<ViewStyle>}) {
  const { setTheme, currentlyTheme } = useTheme();
  const router = useRouter()
  const segments = useSegments();
  const { user } = useUserStore();
  const { logoutUser } = useUser();
  const { update } = userModel();
  
  const toggleTheme = async () => {
    const newTheme = currentlyTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    const token = await AsyncStorage.getItem('auth_token');
    if (user?.id && token) {
      update(user.id, {theme: newTheme}, token);
    }
  
  }
  
  const toggleLocale = async () => {
    const newLocale = i18n.language === 'en' ? 'pt' : 'en';
    const token = await AsyncStorage.getItem('auth_token');

    i18n.changeLanguage(newLocale);

    if (user?.id && token) {
      update(user.id, {language: newLocale}, token);
    }
  }
  
  return (
    <Flex gap={20} style={style}>
      {segments[0] != null && (
        <DrawerButton
          title={'Home'}
          onPress={() => router.push('/')}
        />
      )}
      
      {!user ? (
        <>
          <DrawerButton
            title={'Login'}
            onPress={() => router.push('/login/indexLogin')}
          />
          <DrawerButton
            title={t('register')}
            onPress={() => router.push('/register/indexRegister')}
          />
        </>
      ) : (
        <DrawerButton
          title={t('my_profile')}
          onPress={() => router.push(`/user/[${user.id}]`)}
        />
      )}
      
      <DrawerButton
        title={
          currentlyTheme === 'light' ? t('light_theme') : t('dark_theme')
        }
        onPress={toggleTheme}
      />
      
      <DrawerButton
        title={
          t('language') +
          `: ${i18n.language === 'en' ? t('english') : t('portuguese')}`
        }
        onPress={toggleLocale}
      />
      
      {user && (
        <DrawerButton
          title={'Logout'}
          onPress={() => {
            logoutUser();
            router.push('');
          }}
        />
      )}
    </Flex>
  );
}

