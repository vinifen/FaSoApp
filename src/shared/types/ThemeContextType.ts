import ThemeType from "./ThemeType"

type ThemeContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  currentlyTheme: string;
}
export default ThemeContextType