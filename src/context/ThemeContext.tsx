import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const lightTheme = {
  name: 'light',
  background: '#ffffff',
  cardBackground: ' #FEE995',
  textColor: '#92400e',
  hoverTextColor: '#b45309',
  footerBackground: '#fef3c7',
  content: '#4b5563',
  color: '#000000',
  removeItem: '#ff4d4d',
  shoppingCardLink: '#4CAF50',
  preorderedColor :'#008CBA',
  notPreorderedColor : '#4CAF50',
  buttonTextColor: '#000000',
};

const darkTheme = {
    name: 'dark',
    background: '#121212', // Dark background
    cardBackground: '#1E1E1E', // Slightly lighter background for cards
    textColor: '#E0E0E0', // Light text color for readability
    hoverTextColor: '#FFB74D', // Highlight color for hover states
    footerBackground: '#1E1E1E', // Match card background for consistency
    content: '#B0BEC5', // Light grey for content text
    color: '#FFFFFF', // White color for general text
    removeItem: '#FF5252', // Bright red for remove item button
    shoppingCardLink: '#81C784', // Light green for shopping card link
    preorderedColor: '#64B5F6', // Light blue for preordered button
    notPreorderedColor: '#81C784', // Light green for not preordered button
    buttonTextColor: '#FFFFFF',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    const newTheme = theme.name === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme.name); 
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'light' ? lightTheme : darkTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};