import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {console.log('Username:', username, 'Password:', password)}

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Username" onChangeText={(text) => setUsername(text)}/>
      <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry/>
      <Button
        title='Submit'
        onPress={handleLogin}
      />
    </View>
  )
}