import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import DefaulButtonType from '../../types/DefaultButtonType'
import { useTheme } from '../../hook/useTheme'

export default function DrawerButton({ title = "", onPress}: DefaulButtonType) {
  const { theme} = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.button, 
      borderColor: theme.secondary, 
      borderWidth: 1,
      borderRadius: 20,
      height: 32,
      justifyContent: "center",
      alignItems: "center"
    }
  });
  
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={{color: theme.secondary}}>{title}</Text>
    </TouchableOpacity>
  )
}

