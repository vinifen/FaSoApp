import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import DefaulButtonType from '../../types/DefaultButtonType'
import useTheme from '../../hooks/useTheme';

export default function SubmitButton({title, onPress, isDisabled = false}: DefaulButtonType ) {
  const { theme} = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.button, 
      borderColor: theme.secondary, 
      borderWidth: 1,
      borderRadius: 15,
      height: 42,
      justifyContent: "center",
      alignItems: "center"
    }
  });
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress} disabled={isDisabled}>
      <Text style={{color: theme.secondary}}>{title}</Text>
    </TouchableOpacity>
  )
}