import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import useTheme from "shared/hooks/useTheme";
import useUser from "shared/hooks/useUser";
import { getLoginSchema } from "shared/schemas/userSchemas";
import validationStyles from "shared/styles/validationStyles";
import { LoginType } from "shared/types/UserTypes";
import { RememberMe } from "shared/components/ui";
import { Flex, FormInput, SubmitButton } from "shared/components/ui";

export default function LoginForm({ style }: { style?: StyleProp<ViewStyle> }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const {loginUser} = useUser();
  
  const { 
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginType>({
    resolver: zodResolver(getLoginSchema()),
    mode: "onChange"
  });
  
  async function handleLogin(data: LoginType) {
    try {
      const result = await loginUser(data, rememberMe);
      router.push('');
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(t('unexpected_error'));
      }
    }
  }
  
  return (
    <Flex gap={0} style={style}>
      
      <FormInput
        control={control}
        inputName="email"
        errors={errors}
        placeholder={t("email")}
      /> 
    
    <FormInput
      control={control}
      inputName="password"
      errors={errors}
      placeholder={t("password")}
      secureTextEntry={true}
    />  

      <RememberMe
        style={{ justifyContent: 'center', marginBottom: 25 }}
        value={rememberMe}
        onValueChange={setRememberMe}
      />

      <SubmitButton
        title={t('login')}
        onPress={handleSubmit(handleLogin)}
        isDisabled={!isValid}
      />

      <Flex justify="center" align="center">
        <Text style={[validationStyles.error, {height: 35, textAlign: "center"}]}>
          {error ?? ''}
        </Text>
      </Flex>

      <TouchableOpacity
        onPress={() => router.push('../register')}
        style={{ alignSelf: 'center'}}
      >
        <Text style={{ color: theme.secondary, textAlign: 'center' }}>
          {t('or') + ' '}
          <Text style={{ textDecorationLine: 'underline' }}>
            {t('register')}
          </Text>
        </Text>
      </TouchableOpacity>
    </Flex>
  );
}

