

import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, TextInputProps, StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import useTheme from 'shared/hooks/useTheme';
import validationStyles from 'shared/styles/validationStyles';
import i18n from 'shared/i18n';
import { Flex } from '.';

type DefaultInputType = TextInputProps & {
  control: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  customStyle?: StyleProp<ViewStyle>;
  errors: Record<string, any>;
  inputName: string;
  minHeight?: number;
  maxHeight?: number;
  textAlignVertical?: string;
  textAlign?: string;
  paddingLeft?: number;
  numberOfLines?: number;
};


export default function FormInput({
  control,
  placeholder,
  secureTextEntry = false,
  customStyle,
  errors,
  inputName,
  minHeight=40,
  maxHeight,
  textAlignVertical = "top",
  textAlign="center",
  paddingLeft=0,
  numberOfLines=1,
  ...props
}: DefaultInputType) {
  const { theme, currentlyTheme } = useTheme();
  
  const styles = StyleSheet.create({
    input: {
      backgroundColor: theme.input,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 15,
      textAlign: textAlign,
      color: theme.text,
      minHeight: minHeight,
      maxHeight: maxHeight,
      textAlignVertical: textAlignVertical,
      paddingLeft: paddingLeft,
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
            style={[styles.input, customStyle]}
            placeholder={placeholder}
            placeholderTextColor={theme.text}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            {...props}
            multiline
            numberOfLines={numberOfLines}
            
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
