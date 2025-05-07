import {dark, light} from "../styles/themes";

export type ThemeType = typeof dark | typeof light;

export type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  currentlyTheme: string;
}
