import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useTheme from "../../shared/hooks/useTheme";
import RegisterForm from "./RegisterForm";
import { H2 } from "../../shared/components/Titles";
import Flex from "../../shared/components/Flex";


export default function Register() {
  const { theme} = useTheme();
  const { t } = useTranslation();
  
  return (
    <View style={{ backgroundColor: theme.background, flex: 1, paddingHorizontal: 50 }}>
      <Flex justify="center" align="center" flex={2}>
        <H2 style={{ color: theme.secondary, textAlign: 'center' }}>
          {t('welcome') + " " + t('register')}
        </H2>
      </Flex>
      
      <RegisterForm style={{flex: 8}}></RegisterForm>
    </View>
  );
}
