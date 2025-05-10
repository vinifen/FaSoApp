

import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import useTheme from 'shared/hooks/useTheme';

type DefaultInputType = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  customStyle?: object;
};


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
