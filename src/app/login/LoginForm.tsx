import { Text, TouchableOpacity, Alert, StyleProp, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import FormInput from '../../shared/components/inputs/FormInput'
import { useTheme } from '../../shared/hook/useTheme';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Email from '../../shared/entities/Email';
import Password from '../../shared/entities/Password';
import Username from '../../shared/entities/Username';
import UsersModel from '../../shared/model/UsersModel';
import Flex from '../../shared/components/Flex';
import SubmitButton from '../../shared/components/buttons/SubmitButton';
import RememberMe from 'shared/components/RememberMe';

export default function LoginForm({ style }: {style?: StyleProp<ViewStyle>}) {
  const { theme, currentlyTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const router = useRouter();
  
  async function handleCreateUser() {
    try {
      const user = {
        email: new Email(email),
        password: new Password(password),
      };
      const userModel = new UsersModel();
      await userModel.login(user.email, user.password);
      
      Alert.alert(t('user_created_successfully'));
    } catch (error: any) {
      Alert.alert(error.message || t('unexpected_error'));
    }
  }
  
  return (
    <Flex gap={20} style={style}>
        <FormInput
        
          key={`email-${i18n.language}-${currentlyTheme}`}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
        />
        
        <FormInput
          key={`password-${i18n.language}-${currentlyTheme}`}
          placeholder={t('password')}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        
        <RememberMe style={{justifyContent: "center"}} value={rememberMe} onValueChange={setRememberMe} />
        
        <SubmitButton
          title={t('create_user')}
          onPress={handleCreateUser}
        />
        
        <TouchableOpacity
          onPress={() => router.push('../register/indexRegister')}
          style={{ alignSelf: 'center' }}
        >
          <Text style={{ color: theme.secondary, textAlign: 'center' }}>
            or <Text style={{ textDecorationLine: 'underline' }}>{t('register')}</Text>
          </Text>
        </TouchableOpacity>
        
      </Flex>
  )
}