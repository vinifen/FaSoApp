import { View, Text, TouchableOpacity,StyleSheet, GestureResponderEvent } from 'react-native'
import React from 'react'

type SubmitButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function SubmitButton({ title, onPress }: SubmitButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50', // Cor do botão
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8, // Bordas arredondadas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});