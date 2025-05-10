import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import useTheme from "shared/hooks/useTheme";
import useUser from "shared/hooks/useUser";
import { registerUserSchema } from "shared/schemas/userSchemas";
import validationStyles from "shared/styles/validationStyles";
import { RegisterUserType, LoginType } from "shared/types/UserTypes";
import RememberMe from "shared/components/pages/auth/RememberMe";
import { Flex, FormInput, SubmitButton } from "shared/components/ui";



export default function RegisterForm({ style }: {style?: StyleProp<ViewStyle>}) {
  const { theme, currentlyTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();
  const {registerUser, loginUser} = useUser();
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserType>({
      resolver: zodResolver(registerUserSchema),
    });
  
  async function handleCreateUser(data: RegisterUserType) {
    try {
      console.log('data', data);
      const resultResgiter = await registerUser(data);
      const loginData: LoginType = {email: data.email, password: data.password}
      const resultLogin = await loginUser(loginData, rememberMe);
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
    <Flex gap={20} style={style}> 
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            key={`username-${i18n.language}-${currentlyTheme}`}
            placeholder={t('username')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />

      {errors.username && (
        <Text key={i18n.language} style={validationStyles.error}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            key={`email-${i18n.language}-${currentlyTheme}`}
            placeholder={t('email')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />

      {errors.email && (
        <Text key={i18n.language} style={validationStyles.error}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            key={`password-${i18n.language}-${currentlyTheme}`}
            placeholder={t('password')}
            secureTextEntry
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.password && (
        <Text key={i18n.language} style={validationStyles.error}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name="passwordConfirm"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            key={`password_password-${i18n.language}-${currentlyTheme}`}
            placeholder={t('confirm_password')}
            secureTextEntry
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.passwordConfirm && (
        <Text key={i18n.language} style={validationStyles.error}>{errors.passwordConfirm.message}</Text>
      )}
      {error != '' && (
        <Text key={i18n.language} style={validationStyles.error}>{error}</Text>
      )}

      <RememberMe
        style={{ justifyContent: 'center' }}
        value={rememberMe}
        onValueChange={setRememberMe}
      />

      <SubmitButton
        title={t('register')}
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
        onPress={() => router.push('../login/indexLogin')}
        style={{ alignSelf: 'center' }}
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