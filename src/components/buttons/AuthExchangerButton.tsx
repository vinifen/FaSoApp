import { View, Text, TouchableOpacity,StyleSheet, GestureResponderEvent } from 'react-native'
import React from 'react'

type AuthExchangerButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function AuthExchangerButton({ title, onPress }: AuthExchangerButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E3E3E3',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});