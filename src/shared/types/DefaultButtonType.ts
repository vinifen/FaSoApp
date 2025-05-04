import { GestureResponderEvent } from "react-native";

type DefaultButtonType = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  isDisabled?: boolean;
};

export default DefaultButtonType;