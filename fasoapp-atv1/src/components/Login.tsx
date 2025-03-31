import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'



export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Username" onChangeText={(text) => setUsername(text)}/>
      <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry/>
      <Button
        title='Submit'
        onPress={() => {console.log('Username:', username, 'Password:', password)}}
      />
    </View>
  )
}