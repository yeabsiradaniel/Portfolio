import React from 'react';

/**
 * The Footer component.
 * Displays copyright information and social media links at the bottom of the page.
 */
const Footer = () => {
  return (
    // The footer element with styling for background, blur, padding, and borders.
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md mt-24 py-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-800 ease-in-out">
      <div className="container mx-auto px-4">
        {/* Flex container for alignment and responsiveness */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          
          {/* Copyright notice */}
          <p className="text-sm mb-4 md:mb-0 transition-colors duration-800 ease-in-out">
            {/* The current year is dynamically generated. */}
            &copy; {new Date().getFullYear()} MyPortfolio. All Rights Reserved.
          </p>
          
          {/* Social media links */}
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/yeabsiradaniel" 
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Security measure for target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-800 ease-in-out"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/yeabsira-daniel-3368a5373" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-800 ease-in-out"
            >
              LinkedIn
            </a>
            <a 
              href="https://instagram.com/yeabsiradaniel" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-800 ease-in-out"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export the Footer component
export default Footer;