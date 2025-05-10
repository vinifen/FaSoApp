import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import { t } from "i18next";
import { StyleProp, ViewStyle } from "react-native";
import useTheme from "shared/hooks/useTheme";
import useUser from "shared/hooks/useUser";
import i18n from "shared/i18n";
import userModel from "shared/model/userModel";
import useUserStore from "shared/store/userStore";
import Flex from "../Flex";
import DrawerButton from "./DrawerButton";


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
        {!segments.includes("login") && (<DrawerButton
          title={'Login'}
          onPress={() => router.push('/login')}
        />)}
        {!segments.includes("register") && (<DrawerButton
          title={t('register')}
          onPress={() => router.push('/register')}
        />)}
        </>
      ) : (
        <>
          {!segments.includes("profile") && (<DrawerButton
            title={t('my_profile')}
            onPress={() => router.push(`/user/[${user.id}]/profile`)}
          />)}
          {!segments.includes("posts") && (<DrawerButton
            title={t('my_posts')}
            onPress={() => router.push(`/user/[${user.id}]/posts`)}
          />)}
        </>
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

