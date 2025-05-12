

import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, TextInputProps, StyleSheet, Text, View } from 'react-native';
import useTheme from 'shared/hooks/useTheme';
import validationStyles from 'shared/styles/validationStyles';
import i18n from 'shared/i18n';
import { Flex } from '.';

type DefaultInputType = TextInputProps & {
  control: any
  placeholder?: string;
  secureTextEntry?: boolean;
  customStyle?: object;
  errors: Record<string, any>,
  inputName: string,
  minHeight?: number,
  maxHeight?: number,
};


export default function FormInput({
  control,
  placeholder,
  secureTextEntry = false,
  customStyle = {},
  errors,
  inputName,
  minHeight=40,
  maxHeight,
  ...props
}: DefaultInputType) {
  const { theme, currentlyTheme } = useTheme();
  
  const styles = StyleSheet.create({
    input: {
      backgroundColor: theme.input,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 15,
      textAlign: 'center',
      color: theme.text,
      minHeight: minHeight,
      maxHeight: maxHeight
    },
  });
  
  return (
    
    <Controller
      key={`${inputName}-${i18n.language}-${currentlyTheme}`}
      control={control}
      name={inputName}
      render={({ field: { onChange, onBlur, value } }) => (
        <Flex justify='center'>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={theme.text}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            {...props}
          />
          <Flex justify='center' align='center'>
            <Text style={[validationStyles.error, {height: 35}]}>
              {errors?.[inputName]?.message ?? ' '}
            </Text>
          </Flex>
        </Flex>
      )}
    />
  );
}
