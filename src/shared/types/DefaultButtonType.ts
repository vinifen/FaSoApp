import { GestureResponderEvent } from "react-native";

type DefaulButtonType = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default DefaulButtonType;