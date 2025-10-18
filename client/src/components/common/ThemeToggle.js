import React from 'react';
import { useTheme } from '../../hooks/useTheme'; // Custom hook to access theme context
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // Icons for the toggle button

/**
 * The ThemeToggle component.
 * A button that allows the user to switch between light and dark themes.
 * It uses the `useTheme` hook to get the current theme and the function to toggle it.
 */
const ThemeToggle = () => {
  // Destructure the current theme and the toggle function from the useTheme hook
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme} // Call the toggleTheme function when the button is clicked
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} // Accessibility label
    >
      {/* Conditionally render the MoonIcon or SunIcon based on the current theme */}
      {theme === 'light' ? (
        // Show MoonIcon when the theme is light
        <MoonIcon className="h-6 w-6 text-gray-900" />
      ) : (
        // Show SunIcon when the theme is dark
        <SunIcon className="h-6 w-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;