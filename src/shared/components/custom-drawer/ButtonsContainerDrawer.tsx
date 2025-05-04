import { ViewStyle, StyleProp } from 'react-native'
import React, { useEffect } from 'react'
import Flex from '../Flex'
import { t } from 'i18next'
import i18n from '../../i18n'
import DrawerButton from '../buttons/DrawerButton'
import { useRouter } from 'expo-router'
import { useTheme } from 'shared/hook/useTheme'
import { useSegments } from 'expo-router';
export default function ButtonsContainerDrawer({ style }: {style?: StyleProp<ViewStyle>}) {
  const { setTheme, currentlyTheme } = useTheme();
  const router = useRouter()
  const segments = useSegments();
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }
  
  const toggleLocale = () => {
    const newLocale = i18n.language === 'en' ? 'pt' : 'en'
    i18n.changeLanguage(newLocale)
  }
  
  
  return (
    <Flex gap={20} style={style}>
    {segments[0] != null && (
      <DrawerButton
        title={'Home'}
        onPress={() => router.push('/')}
      />
    )}
      <DrawerButton
        title={'Login'}
        onPress={() => router.push('/login/indexLogin')}
      />
      <DrawerButton
        title={t('register')}
        onPress={() => router.push('/register/indexRegister')}
      />
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
    </Flex>
  )
}
