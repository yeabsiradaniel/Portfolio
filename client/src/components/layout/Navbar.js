// Import necessary libraries and components
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // For navigation links that know if they are active
import ThemeToggle from '../common/ThemeToggle'; // The dark/light mode toggle button
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'; // Icons for the mobile menu
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import logo from '../../assets/logo.svg'; // The portfolio logo

/**
 * The Navbar component.
 * Displays the main navigation links, logo, and theme toggle.
 * It is responsive and includes a mobile-friendly menu.
 */
const Navbar = () => {
  // State to manage the visibility of the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Array of navigation links to be rendered
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
  ];

  // Animation variants for the mobile menu (using Framer Motion)
  const mobileMenuVariants = {
    closed: { opacity: 0, y: '-100%' }, // State when the menu is closed
    open: { opacity: 1, y: '0%' },     // State when the menu is open
  };

  return (
    <>
      {/* Main navigation bar */}
      <nav className="backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-800 ease-in-out">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/">
                <img src={logo} alt="MyPortfolio Logo" className="h-14" />
              </NavLink>
            </div>
            {/* Desktop Navigation Links (hidden on medium screens and below) */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  // Dynamically set class names based on whether the link is active
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
            {/* Right side items: Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center">
              <ThemeToggle />
              {/* Mobile Menu Button (visible on medium screens and below) */}
              <div className="md:hidden ml-4">
                <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                  {isOpen ? (
                    <XMarkIcon className="h-6 w-6" /> // Close icon
                  ) : (
                    <Bars3Icon className="h-6 w-6" /> // Hamburger icon
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (animated with Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 z-40 md:hidden transition-colors duration-300"
          >
            {/* Links inside the mobile menu */}
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-3xl font-bold transition-colors duration-300 ${isActive ? 'text-blue-500' : 'hover:text-blue-500'}`
                  }
                  // Close the menu when a link is clicked
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;