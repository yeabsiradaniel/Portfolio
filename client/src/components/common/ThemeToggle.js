import React from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (e) => {
    const supported =
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supported) {
      toggleTheme();
      return;
    }

    const next = theme === 'light' ? 'dark' : 'light';
    const x = e.clientX;
    const y = e.clientY;
    const root = document.documentElement;

    // Freeze per-element transitions so the wipe reveals a settled theme
    root.classList.add('theme-switching');

    const transition = document.startViewTransition(() => {
      flushSync(() => toggleTheme());
      // The provider applies the class in a useEffect, which is async.
      // Apply it synchronously here so the new snapshot is already themed.
      root.classList.remove('light', 'dark');
      root.classList.add(next);
    });

    transition.ready
      .then(() => {
        const maxRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => {
      root.classList.remove('theme-switching');
    });
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-200 focus:outline-none"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
