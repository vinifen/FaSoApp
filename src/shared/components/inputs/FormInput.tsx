import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import DefaultInputType from '../../types/DefaultInputType';
import { useTheme } from '../../hook/useTheme';

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  customStyle = {},
  ...props
}: DefaultInputType) {

  const {theme} = useTheme();
  const styles = StyleSheet.create({
    input: {
      backgroundColor: theme.input,
      borderColor: theme.border,
      color: theme.secondary,
      borderWidth: 1,
      borderRadius: 10
    },
  });
  
  return (
    <TextInput
      className='text-center'
      style={[styles.input, customStyle]} 
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.placeholder}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};


