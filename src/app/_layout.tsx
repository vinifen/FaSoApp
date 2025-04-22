import { Drawer } from 'expo-router/drawer';
import { Image, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import "../../global.css";
import '../shared/i18n';
import ThemeProvider from '../shared/context/ThemeProvider';
import { useTheme } from '../shared/hook/useTheme';
import { useEffect } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import CustomDrawerContent from '../shared/components/CustomDrawerContent';

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
        
        drawerInactiveTintColor: theme.secundary,
        drawerActiveTintColor: theme.secundary,
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {currentlyTheme === "light" ? (
              <Image
                source={require('../../assets/images/fasoapp-logo.png')}
                resizeMode="contain"
                className="w-9 h-9 mr-2"
              />
            ) : (
              <Image
                source={require('../../assets/images/fasoapp-logo-darktheme.png')}
                resizeMode="contain"
                className="w-9 h-9 mr-2"
              />
            )}
            <Text
              style={{ color: theme.secundary }}
              className='font-bold text-xl'
            >
              FaSoApp
            </Text>
            
          </View>
        ),
        headerRight: () => (
          <Feather
            name="menu"
            size={24}
            color={theme.secundary} 
            className='mr-5'
            onPress={openSidenav} 
          />
        ),
      }}
      drawerContent = {() => <CustomDrawerContent/>}
    />
    </>
  );
}
