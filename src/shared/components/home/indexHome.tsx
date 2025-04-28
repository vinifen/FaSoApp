import { View, Text, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../hook/useTheme';
import { useTranslation } from 'react-i18next';
import UsersModel from '../../model/UsersModel';
import Email from '../../entities/Email';
import Username from '../../entities/Username';
import Password from '../../entities/Password';

export default function Home() {
  const { theme, currentlyTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  async function handleCreateUser() {
    try {
      const user = {
        email: new Email(email),
        username: new Username(username),
        password: new Password(password),
        passwordConfirm: new Password(password),
        theme: currentlyTheme,
        language: i18n.language
      };
      const userModel = new UsersModel();
      await userModel.create(user);
      
      Alert.alert(t('user_created_successfully'));
    } catch (error: any) {
      Alert.alert(error.message || t('unexpected_error'));
    }
  }

  return (
    <View style={{ backgroundColor: theme.background }} className="h-full justify-center p-4">
      <Text style={{ color: theme.secondary }} className="text-2xl mb-4">
        {t('welcome')}
      </Text>

      <TextInput
        placeholder={t('email')}
        placeholderTextColor={theme.placeholder}
        style={{ color: theme.text, borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: 12 }}
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        placeholder={t('username')}
        placeholderTextColor={theme.placeholder}
        style={{ color: theme.text, borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: 12 }}
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        placeholder={t('password')}
        placeholderTextColor={theme.placeholder}
        secureTextEntry
        style={{ color: theme.text, borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: 12 }}
        value={password}
        onChangeText={setPassword}
      />
      
      <TextInput
        placeholder={t('password_confirm')}
        placeholderTextColor={theme.placeholder}
        secureTextEntry
        style={{ color: theme.text, borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: 20 }}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />
      
      <Button title={t('create_user')} onPress={handleCreateUser} />
      
      
    </View>
  );
}
