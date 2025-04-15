import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import AuthExchangerButton from '../../components/buttons/AuthExchangerButton'

export default function Authentication() {
  const [authExchanger, setAuthExchanger] = useState<boolean>(false);

  const switchToLogin = () => {setAuthExchanger(true)}
  const switchToRegister = () => {setAuthExchanger(false)}

  return (
    <View>
      <View>
        <AuthExchangerButton title='Login' onPress={switchToLogin}/>
        <AuthExchangerButton title='Register' onPress={switchToRegister}/>
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