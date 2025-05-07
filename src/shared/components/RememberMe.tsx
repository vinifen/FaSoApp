import React from 'react';
import { Text, StyleSheet, Pressable, StyleProp, ViewStyle} from 'react-native';
import Checkbox from 'expo-checkbox';

import useTheme from 'shared/hooks/useTheme';

type RememberMeProps = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  label?: string;
  style?: StyleProp<ViewStyle>
};

export default function RememberMe({
  value,
  onValueChange,
  label = 'Remember me',
  style
}: RememberMeProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[style, styles.container]}
      onPress={() => onValueChange(!value)}
    >
      <Checkbox
        value={value}
        onValueChange={onValueChange}
    
      />
      <Text style={{ color: theme.text, fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
});
