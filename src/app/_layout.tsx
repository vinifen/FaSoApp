import { Drawer } from 'expo-router/drawer';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import '../shared/i18n';
import ThemeProvider from '../shared/context/ThemeProvider';
import { useTheme } from '../shared/hook/useTheme';
import { useEffect } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import CustomDrawerContent from '../shared/components/CustomDrawerContent';
import { useRouter } from 'expo-router';
import LogoImage from '../shared/components/LogoImage';

export default function Layout() {
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
  
  const openSidenav = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
    useEffect(() => {
    if (deviceTheme && deviceTheme !== currentlyTheme) {
      setTheme(deviceTheme);
    }
  }, [deviceTheme]);
  
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
          height: 80
        },
        
        drawerInactiveTintColor: theme.secondary,
        drawerActiveTintColor: theme.secondary,
        headerTitle: () => (
          <TouchableOpacity
            onPress={() => router.push('')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <LogoImage />
            <Text style={{ color: theme.secondary }}>
              FaSoApp
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Feather
            name="menu"
            size={24}
            color={theme.secondary} 
            style={{marginRight: 10}}
            onPress={openSidenav} 
          />
        ),
      }}
      drawerContent = {() => <CustomDrawerContent/>}
    />
    </>
  );
}
