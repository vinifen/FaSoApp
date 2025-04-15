import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

export default function Authentication() {
  const [authExchanger, setAuthExchanger] = useState<boolean>(false);

  const switchToLogin = () => {setAuthExchanger(true)}
  const switchToRegister = () => {setAuthExchanger(false)}

  return (
    <View>
      <View>
        <Button title="Login" onPress={switchToLogin} />
        <Button title="Register" onPress={switchToRegister} />
      </View>
      <View>
        {authExchanger ? ( 
          <Login></Login>
        ) : ( 
          <Register></Register>
        )
        }
      </View>
    </View>
  )
}