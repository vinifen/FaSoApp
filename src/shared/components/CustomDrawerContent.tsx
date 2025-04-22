import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useTheme } from '../hook/useTheme'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import DrawerButton from './buttons/DrawerButton'
import { useRouter } from 'expo-router';

export default function CustomDrawerContent(drawerProps: DrawerContentComponentProps) {

  const {t} = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  const closeSidenav = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary}}>

      <View style={{flex: 1.2}} className='justify-center'>
        <Feather
          name="menu"
          size={24}
          color={theme.secundary} 
          className='ml-5'
          onPress={closeSidenav} 
        />
      </View>
      
      <View style={{ flex: 1 }} className='justify-end items-center'>
        <MaterialCommunityIcons 
          name="account" 
          size={35} 
          color={theme.secundary} 
          className='mb-2'
        />
        <Text style={{color: theme.secundary}}>{t('hello_user')} Vinicius</Text>
      </View>
      
      <View style={{ flex: 7 }} className='mx-4'>
        <View className='justify-between h-40 mt-6'>
          <DrawerButton title={"Login"} onPress={() => router.push('/login/indexLogin')}/>
          <DrawerButton title={t('dark_theme')} onPress={() => router.push('/login/indexLogin')} />
          <DrawerButton title={t('language') + " off"} onPress={() => router.push('/login/indexLogin')} />
        </View>
        
      </View>
    </View>
  )
}
