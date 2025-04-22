import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import DefaulButtonType from '../../types/DefaultButtonType'
import { useTheme } from '../../hook/useTheme'

export default function DrawerButton({ title = "", onPress}: DefaulButtonType) {
  const { theme} = useTheme();
  return (
    <TouchableOpacity 
      style={{
        backgroundColor: theme.button, 
        borderColor: theme.secundary, 
        borderWidth: 1,
        borderRadius: 20
      }}
      onPress={onPress}
      className='h-9 justify-center items-center'
    >
      <Text style={{color: theme.secundary}}>{title}</Text>
    </TouchableOpacity>
  )
}