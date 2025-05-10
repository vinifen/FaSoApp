import { GestureResponderEvent, TouchableOpacity, Text, StyleSheet } from "react-native";
import useTheme from "shared/hooks/useTheme";


type DefaultButtonType = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  isDisabled?: boolean;
};


export default function DrawerButton({ title = "", onPress}: DefaultButtonType) {
  const { theme} = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.button, 
      borderColor: theme.secondary, 
      borderWidth: 1,
      borderRadius: 20,
      height: 32,
      justifyContent: "center",
      alignItems: "center"
    }
  });
  
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={{color: theme.secondary}}>{title}</Text>
    </TouchableOpacity>
  )
}

