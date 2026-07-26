import React, { createContext, useContext, useState, useEffect } from 'react';
import { applySceneTheme, defaultMaterialFor } from '../lib/sceneThemes';

// Create a React Context for the theme. This will be used to provide and consume the theme state.
const ThemeContext = createContext();

/**
 * Custom hook `useTheme`.
 * A convenience hook to access the theme context (theme and toggleTheme function) from any component.
 * This avoids having to import and use `useContext(ThemeContext)` in every component that needs theme access.
 * @returns {object} The theme context value: { theme, toggleTheme, material, setMaterial }.
 */
export const useTheme = () => useContext(ThemeContext);

// localStorage can throw in restrictive browsing modes (private windows,
// locked-down enterprise browsers) — never let it blank the app.
const storage = {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* persistence unavailable; session-only preference */
    }
  },
};

const prefersDark = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

// First visit follows the OS preference; an explicit toggle is persisted
// and always wins on later visits.
const initialTheme = () => storage.get('theme') || (prefersDark() ? 'dark' : 'light');

/**
 * The ThemeProvider component.
 * This component wraps the application and provides the theme state and toggle function to all its children.
 * It also handles persisting the theme to localStorage and applying the theme class to the HTML root element.
 *
 * Besides the light/dark mode it tracks the selected 3D material. The pair
 * (theme, material) drives the site-wide CSS tokens via applySceneTheme, so
 * text, cards and accents all follow the centerpiece. A material the user
 * picks explicitly is persisted and kept across mode switches; otherwise the
 * material follows the mode default (obsidian / pearl).
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 */
export const ThemeProvider = ({ children }) => {
  // Initialize the theme state. Stored choice first; otherwise the OS
  // preference (prefers-color-scheme), falling back to light.
  const [theme, setTheme] = useState(initialTheme);

  // Material explicitly chosen via the scene controls is persisted; without a
  // stored choice the material follows the mode default.
  const [material, setMaterialState] = useState(
    () => storage.get('material') || defaultMaterialFor(storage.get('theme') || 'light')
  );

  // useEffect hook to apply side effects when the theme state changes.
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element

    // Remove any existing theme classes to ensure a clean state
    root.classList.remove('light', 'dark');

    // Add the current theme class (e.g., 'dark' or 'light') to the <html> element.
    // This is how Tailwind CSS's dark mode is enabled.
    root.classList.add(theme);

    // Save the current theme choice to localStorage to persist it across browser sessions.
    storage.set('theme', theme);

    // Re-resolve the material: keep an explicit choice, otherwise follow the mode.
    setMaterialState(storage.get('material') || defaultMaterialFor(theme));
  }, [theme]); // This effect runs whenever the `theme` state changes.

  // Apply the (theme, material) design tokens to the document root.
  useEffect(() => {
    applySceneTheme(theme, material);
  }, [theme, material]);

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  /**
   * Explicitly select a 3D material. Persisted so the choice survives mode
   * switches and reloads.
   */
  const setMaterial = (name) => {
    storage.set('material', name);
    setMaterialState(name);
  };

  // The Provider component makes the `theme` state and `toggleTheme` function available
  // to all descendant components that use the `useTheme` hook.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, material, setMaterial }}>
      {children}
    </ThemeContext.Provider>
  );
};