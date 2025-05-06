import { View, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../../hook/useTheme';


export default function Home() {
  const {theme} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Text>Home</Text>
    </View>
  )
}
