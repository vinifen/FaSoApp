import ThemeType from '../types/ThemeType'

export const dark = {
  primary: '#2D3033',
  secondary: '#9BB4C5',
  input: '#4D5056',
  button: '#4D5056',
  background: '#282B30',
  details: '#4D5056',
  text: '#9BB4C5',
  placeholder: '#9BB4C5',
  border: '#9BB4C5'
} as const;

export const light = {
  primary: '#E3E3E3',
  secondary:'#262F38',
  input: '#DBDBDB',
  button: '#E3E3E3',
  background: '#C4C4C4',
  details: '#262F38',
  text: '#262F38',
  placeholder: '#262F38',
  border: '#262F38'
} as const;

const themes = (theme: string): ThemeType  => {
  if (theme === "dark") return dark;
  return light;
}
export default themes;