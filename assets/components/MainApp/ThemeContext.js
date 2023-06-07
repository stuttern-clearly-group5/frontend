import React, { createContext, useState } from 'react';

// Define the initial theme state
const initialTheme = {
  mode: 'light',
  colors: {
    background: 'white',
    text: 'black',
  },
};

// Define the colors for light and dark themes
const lightColors = {
  background: 'white',
  text: 'black',
};

const darkColors = {
  background: 'black',
  text: 'white',
};

// Create the ThemeContext
export const ThemeContext = createContext({
  theme: initialTheme,
  toggleTheme: () => {},
});

// Create the ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);

  // Function to toggle the theme
  const toggleTheme = () => {
    const mode = theme.mode === 'light' ? 'dark' : 'light';
    const colors = mode === 'light' ? lightColors : darkColors;
    setTheme({ mode, colors });
  };

  // Merge the current theme with the selected colors
  const mergedTheme = {
    ...theme,
    colors: theme.colors, // Use the colors from the theme state
  };

  return (
    <ThemeContext.Provider value={{ theme: mergedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
