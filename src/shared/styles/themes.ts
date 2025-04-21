import ThemeType from '../types/ThemeType'

export const dark = {
  primary: '#2D3033',
  secundary: '#9BB4C5',
  input: '#4D5056',
  button: '#4D5056',
  background: '#4D5056',
  details: '#4D5056'
} as const;

export const light = {
  primary: '#E3E3E3',
  secundary:'#262F38',
  input: '#FFFFFF',
  button: '#FFFFF',
  background: '#C4C4C4',
  details: '#262F38'
} as const;

const themes = (theme: string): ThemeType  => {
  if (theme === "dark") return dark;
  return light;
}
export default themes;