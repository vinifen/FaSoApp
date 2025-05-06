import React from 'react';
import ThemeContextType from '../types/ThemeContextType';

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext;