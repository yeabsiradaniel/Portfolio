// Import necessary libraries and components
import React from 'react';
import { motion } from 'framer-motion'; // For animations
import Hero from '../components/home/Hero'; // The main hero section component
import useDocumentTitle from '../hooks/useDocumentTitle'; // Custom hook to set the document title

/**
 * The Home page component.
 * This component serves as the main landing page of the application.
 */
const Home = () => {
  // Set the document title for this page using the custom hook.
  useDocumentTitle('Home');

  return (
    // `motion.div` is a component from Framer Motion that enables animations.
    // This div will fade in when the page loads and fade out when it unmounts.
    <motion.div
      initial={{ opacity: 0 }} // Initial state: fully transparent
      animate={{ opacity: 1 }} // Animate to: fully opaque
      exit={{ opacity: 0 }}    // Exit state: fully transparent
      transition={{ duration: 0.5 }} // Animation duration: 0.5 seconds
    >
      {/* Render the Hero component, which contains the main content for the home page. */}
      <Hero />
    </motion.div>
  );
};

// Export the Home component
export default Home;