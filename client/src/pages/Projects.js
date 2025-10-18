// Import necessary libraries and components
import React from 'react';
import { motion } from 'framer-motion'; // For animations
import ProjectGrid from '../components/projects/ProjectGrid'; // Component that displays the grid of projects
import useDocumentTitle from '../hooks/useDocumentTitle'; // Custom hook for setting the document title
import Section from '../components/common/Section'; // Reusable section component

/**
 * The Projects page component.
 * This page showcases a collection of my work in a grid format.
 */
const Projects = () => {
  // Set the document title for this page
  useDocumentTitle('Projects');

  return (
    // Main container with a flex layout
    <div className="flex bg-transparent transition-colors duration-800 ease-in-out">
      {/* Left side spacer: This div is hidden on small screens and takes up 1/4 of the width on large screens. */}
      <div className="hidden lg:block lg:w-1/4"></div>

      {/* Right side content area */}
      <div className="w-full lg:w-3/4 flex flex-col items-center justify-center p-8 pt-24">
        {/* Framer Motion div for fade-in animation */}
        <motion.div
          initial={{ opacity: 0 }} // Start with zero opacity
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }}    // Fade out on exit
          transition={{ duration: 0.5 }} // Animation duration
          className="w-full"
        >
          {/* A single section containing the page's content */}
          <Section>
            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">My Work</h1>
            
            {/* The grid of projects */}
            <ProjectGrid />
          </Section>
        </motion.div>
      </div>
    </div>
  );
};

// Export the Projects component
export default Projects;