import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'
import React from 'react'
import useTheme from '../../hooks/useTheme';

type DefaultButtonType = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  isDisabled?: boolean;
};

export default function SubmitButton({title, onPress, isDisabled = false}: DefaultButtonType ) {
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