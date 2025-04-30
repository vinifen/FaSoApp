import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View, Button, Text, TouchableOpacity } from "react-native";
import Email from "../../shared/entities/Email";
import Password from "../../shared/entities/Password";
import Username from "../../shared/entities/Username";
import { useTheme } from "../../shared/hook/useTheme";
import UsersModel from "../../shared/model/UsersModel";
import FormInput from "../../shared/components/inputs/FormInput";
import { useRouter } from "expo-router";


export default function Register() {
  const { theme, currentlyTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const router = useRouter();
  
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
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <View className="h-2/6 justify-center items-center">
        <Text style={{ color: theme.secondary }} className="text-3xl">
          {t('welcome') + " " + t('register')}
        </Text>
      </View>
      
      <View className="h-4/6 justify-between">
        <FormInput
          placeholder={t('email')}
          placeholderTextColor={theme.placeholder}
          
          value={email}
          onChangeText={setEmail}
        />
        
        <FormInput
          placeholder={t('username')}
          placeholderTextColor={theme.placeholder}
          
          value={username}
          onChangeText={setUsername}
        />
        
        <FormInput
          placeholder={t('password')}
          placeholderTextColor={theme.placeholder}
          secureTextEntry
          
          value={password}
          onChangeText={setPassword}
        />
        
        <FormInput
          placeholder={t('password_confirm')}
          placeholderTextColor={theme.placeholder}
          secureTextEntry
          
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />

        <TouchableOpacity onPress={()=> router.push('../login/indexLogin')}>
          <Text>or Login</Text>
        </TouchableOpacity>
        
        <Button title={t('create_user')} onPress={handleCreateUser} />
      </View>
      
    </View>
  );
}
