import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a React Context for the theme. This will be used to provide and consume the theme state.
const ThemeContext = createContext();

/**
 * Custom hook `useTheme`.
 * A convenience hook to access the theme context (theme and toggleTheme function) from any component.
 * This avoids having to import and use `useContext(ThemeContext)` in every component that needs theme access.
 * @returns {object} The theme context value: { theme, toggleTheme }.
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * The ThemeProvider component.
 * This component wraps the application and provides the theme state and toggle function to all its children.
 * It also handles persisting the theme to localStorage and applying the theme class to the HTML root element.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 */
export const ThemeProvider = ({ children }) => {
  // Initialize the theme state. It tries to get the theme from localStorage first,
  // otherwise, it defaults to 'light'.
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // useEffect hook to apply side effects when the theme state changes.
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element

    // Remove any existing theme classes to ensure a clean state
    root.classList.remove('light', 'dark');
    
    // Add the current theme class (e.g., 'dark' or 'light') to the <html> element.
    // This is how Tailwind CSS's dark mode is enabled.
    root.classList.add(theme);
    
    // Save the current theme choice to localStorage to persist it across browser sessions.
    localStorage.setItem('theme', theme);
  }, [theme]); // This effect runs whenever the `theme` state changes.

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // The Provider component makes the `theme` state and `toggleTheme` function available
  // to all descendant components that use the `useTheme` hook.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};