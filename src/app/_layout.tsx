import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import '../shared/i18n';
import ThemeProvider from '../shared/context/ThemeProvider';
import { useTheme } from '../shared/hook/useTheme';
import { useEffect } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import CustomDrawerContent from '../shared/components/custom-drawer/CustomDrawerContent';
import { useRouter } from 'expo-router';
import LogoImage from '../shared/components/LogoImage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H1 } from '../shared/components/Titles';

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
  const insets = useSafeAreaInsets();
  
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
