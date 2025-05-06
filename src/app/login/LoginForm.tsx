import {
  Text,
  TouchableOpacity,
  Alert,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import FormInput from '../../shared/components/FormInput';
import { useTheme } from '../../shared/hook/useTheme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Flex from '../../shared/components/Flex';
import SubmitButton from '../../shared/components/buttons/SubmitButton';
import RememberMe from 'shared/components/RememberMe';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginType } from 'shared/types/UserTypes';
import UsersModel from 'shared/model/UserModel';
import { loginSchema } from 'shared/schemas/UserSchemas';
import validationStyles from 'shared/styles/validationStyles';

export default function LoginForm({ style }: { style?: StyleProp<ViewStyle> }) {
  const { theme, currentlyTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const { 
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginType) {
    try {
      const userModel = new UsersModel();
      const result = await userModel.login(data);
      // if (rememberMe) {
      //   await AsyncStorage.setItem('user', JSON.stringify(userData));
      // }
      console.log('result', result.data.token);
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

