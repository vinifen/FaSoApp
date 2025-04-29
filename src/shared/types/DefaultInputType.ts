// CustomInput.tsx
import { TextInputProps } from 'react-native';

type DefaultInputType = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  customStyle?: object;
};
export default DefaultInputType;