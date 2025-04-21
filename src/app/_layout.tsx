import { Stack } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import "../../global.css";
import '../shared/i18n';
import ThemeProvider from '../shared/context/ThemeProvider';
import { useTheme } from '../shared/hook/useTheme';
import { useEffect } from 'react';


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

  useEffect(() => {
    if (deviceTheme && deviceTheme !== currentlyTheme) {
      setTheme(deviceTheme);
    }
  }, [deviceTheme]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            { currentlyTheme === "light" ? ( 
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
              )
            }
            <Text 
            style={{color: theme.secundary}} 
            className='font-bold text-xl'
            >FaSoApp</Text>
          </View>
        ),
        headerRight: () => (
          <View>
            <Feather name="menu" size={24} color={theme.secundary} style={{ marginRight: 12 }} />
          </View>
        ),
      }}
    />
  );
}
