import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import DefaultInputType from 'shared/types/DefaultInputType';
import { useTheme } from 'shared/hook/useTheme';

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  customStyle = {},
  ...props
}: DefaultInputType) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    input: {
      backgroundColor: theme.input,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 15,
      color: theme.text,
      textAlign: 'center',
      height: 38,
    },
  });

  return (
    <TextInput
      style={[styles.input, customStyle]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.placeholder}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
}
