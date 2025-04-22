import React, { useMemo, useState } from 'react'
import ThemeContext from './ThemeContext'
import themes from '../styles/themes';
import ThemeType from '../types/ThemeType';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<string>("light");
  const theme = useMemo<ThemeType>(() => themes(themeName), [themeName]);
  
  return (
    <ThemeContext.Provider value={{theme, setTheme: setThemeName, currentlyTheme: themeName}}>
      {children}
    </ThemeContext.Provider>
  );
}