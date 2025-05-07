import React from 'react';
import { ThemeContextType } from 'shared/types/ThemeTypes';

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext;