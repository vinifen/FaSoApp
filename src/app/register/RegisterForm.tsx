import { Text, TouchableOpacity, Alert, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import FormInput from '../../shared/components/FormInput'
import { useTheme } from '../../shared/hook/useTheme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import UsersModel from '../../shared/model/UserModel';
import Flex from '../../shared/components/Flex';
import SubmitButton from '../../shared/components/buttons/SubmitButton';
import RememberMe from 'shared/components/RememberMe';
import {Controller, useForm } from 'react-hook-form';
import { RegisterUserType } from 'shared/types/UserTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import validationStyles from 'shared/styles/validationStyles';
import { registerUserSchema } from 'shared/schemas/UserSchemas';
export default function RegisterForm({ style }: {style?: StyleProp<ViewStyle>}) {
  const { theme, currentlyTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserType>({
      resolver: zodResolver(registerUserSchema),
    });
  
  async function handleCreateUser(data: RegisterUserType) {
    try {
      const userModel = new UsersModel();
      console.log('data', data);
      const result = await userModel.create(data);
      // if (rememberMe) {
      //   await AsyncStorage.setItem('user', JSON.stringify(userData));
      // }
      console.log('result', result);
      // router.push('');
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
        onPress={() => router.push('../register/indexRegister')}
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