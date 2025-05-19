import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { useColorScheme, StatusBar, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoImage, CustomDrawerContent } from 'shared/components/ui';
import { H1 } from 'shared/components/ui/Titles';
import ThemeProvider from 'shared/context/ThemeProvider';
import useTheme from 'shared/hooks/useTheme';
import useUser from 'shared/hooks/useUser';

export default function _layout() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

function Content() {
  const deviceTheme = useColorScheme();
  const { theme, setTheme, currentlyTheme } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {checkUserAuth} = useUser();
  
  const openSidenav = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  
  useEffect(() => {
  const fetchTokenAndSetTheme = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    if (deviceTheme && deviceTheme !== currentlyTheme && !token) {
      setTheme(deviceTheme);
    }
  };
  
  fetchTokenAndSetTheme();
  }, [deviceTheme]);
  
  useEffect(() => {
    const verifySession = async () => {
      const token = await AsyncStorage.getItem('auth_token')
      if(token) checkUserAuth(token);
    };
    
    verifySession();
  }, []);
  
  return (
    <>
    <StatusBar backgroundColor={theme.primary}/>
    <Drawer
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: 240
        },
        headerStyle: {
          backgroundColor: theme.primary,
          height: 60 + insets.top
        },
        
        drawerInactiveTintColor: theme.secondary,
        drawerActiveTintColor: theme.secondary,
        headerTitle: () => (
          <TouchableOpacity
            onPress={() => router.push('')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <LogoImage />
            <H1 style={{ color: theme.secondary, marginLeft: 5 }}>
              FaSoApp
            </H1>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Feather
            name="menu"
            size={24}
            color={theme.secondary} 
            style={{marginRight: 20}}
            onPress={openSidenav} 
          />
        ),
      }}
      drawerContent = {() => <CustomDrawerContent/>}
    />
    </>
  );
}
