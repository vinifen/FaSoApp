import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleProp, ViewStyle, TouchableOpacity, Text } from "react-native";
import useTheme from "shared/hooks/useTheme";
import useUser from "shared/hooks/useUser";
import { loginSchema } from "shared/schemas/userSchemas";
import validationStyles from "shared/styles/validationStyles";
import { LoginType } from "shared/types/UserTypes";
import RememberMe from "shared/components/pages/auth/RememberMe";
import { Flex, FormInput, SubmitButton } from "shared/components/ui";


export default function LoginForm({ style }: { style?: StyleProp<ViewStyle> }) {
  const { theme, currentlyTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const {loginUser} = useUser();

  const { 
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginType) {
    try {
      const result = await loginUser(data, rememberMe);
      console.log("result : " ,result);
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
      {error != '' && (
        <Text key={i18n.language} style={validationStyles.error}>{error}</Text>
      )}

      <RememberMe
        style={{ justifyContent: 'center' }}
        value={rememberMe}
        onValueChange={setRememberMe}
      />

      <SubmitButton
        title={t('login')}
        onPress={handleSubmit(handleLogin)}
      />

      <TouchableOpacity
        onPress={() => router.push('../register/indexRegister')}
        style={{ alignSelf: 'center' }}
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

