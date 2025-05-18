import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useTheme from "shared/hooks/useTheme";
import RegisterForm from "shared/components/pages/auth/RegisterForm";
import { H2 } from "shared/components/ui/Titles";
import Flex from "shared/components/ui/Flex";


export default function _screen() {
  const { theme} = useTheme();
  const { t } = useTranslation();
  
  return (
    <View style={{ backgroundColor: theme.background, flex: 1, paddingHorizontal: "10%" }}>
      <Flex justify="center" align="center" flex={2}>
        <H2 style={{ color: theme.secondary, textAlign: 'center' }}>
          {t('welcome') + " " + t('register')}
        </H2>
      </Flex>
      
      <RegisterForm style={{flex: 8}}></RegisterForm>
    </View>
  );
}
