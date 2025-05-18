import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import useTheme from "shared/hooks/useTheme";
import useUser from "shared/hooks/useUser";
import { getRegisterUserSchema } from "shared/schemas/userSchemas";
import validationStyles from "shared/styles/validationStyles";
import { RegisterUserType, LoginType } from "shared/types/UserTypes";
import RememberMe from "shared/components/pages/auth/RememberMe";
import { Flex, FormInput, SubmitButton } from "shared/components/ui";
import { useTranslation } from "react-i18next";



export default function RegisterForm({ style }: {style?: StyleProp<ViewStyle>}) {
  const { theme, currentlyTheme } = useTheme();
  
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const {registerUser, loginUser} = useUser();
  const { t, i18n } = useTranslation();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterUserType>({
      resolver: zodResolver(getRegisterUserSchema()),
      mode: "onChange"
    });
  
  async function handleCreateUser(data: RegisterUserType) {
    try {
      console.log('data', data);
      await registerUser(data);
      const loginData: LoginType = {email: data.email, password: data.password}
      await loginUser(loginData, rememberMe);
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
        inputName="username"
        errors={errors}
        placeholder={t("username")}
      />
      
      <FormInput
        control={control}
        inputName="email"
        errors={errors}
        placeholder={t("email")}
      />
      
      <FormInput
        control={control}
        inputName="password"
        secureTextEntry={true}
        errors={errors}
        placeholder={t("password")}
      />
      
      <FormInput
        control={control}
        inputName="passwordConfirm"
        secureTextEntry={true}
        errors={errors}
        placeholder={t("password_confirm")}
      />
      
      <RememberMe
        style={{ justifyContent: 'center' }}
        value={rememberMe}
        onValueChange={setRememberMe}
      />
      <Flex justify="center" align="center">
        <Text style={[validationStyles.error, {height: 35, textAlign: "center"}]}>
          {error ?? ''}
        </Text>
      </Flex>
      
      <SubmitButton
        title={t('register')}
        isDisabled={!isValid}
        onPress={handleSubmit((data) => handleCreateUser({
          email: data.email,
          username: data.username,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
          theme: currentlyTheme,
          language: i18n.language,
        }))}
      />
      
      <TouchableOpacity
        onPress={() => router.push('../login')}
        style={{ alignSelf: 'center', marginTop: 14 }}
      >
        <Text style={{ color: theme.secondary, textAlign: 'center' }}>
          {t('or') + ' '}
          <Text style={{ textDecorationLine: 'underline' }}>
            {t('login')}
          </Text>
        </Text>
      </TouchableOpacity>
    </Flex>
  );
}