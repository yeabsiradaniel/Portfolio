// Import necessary libraries and components
import React from 'react';
import { motion } from 'framer-motion'; // For animations
import AboutMe from '../components/about/AboutMe';
import Skills from '../components/about/Skills';
import Timeline from '../components/about/Timeline';
import useDocumentTitle from '../hooks/useDocumentTitle'; // Custom hook for setting document title
import Section from '../components/common/Section'; // A reusable section component

/**
 * The About page component.
 * This page displays information about me, my skills, and my career timeline.
 */
const About = () => {
  // Set the document title for this page
  useDocumentTitle('About Me');

  return (
    // Main container with a flex layout
    <div className="flex bg-transparent transition-colors duration-800 ease-in-out">
      {/* Left side spacer: This div is hidden on small screens and takes up 1/4 of the width on large screens. */}
      <div className="hidden lg:block lg:w-1/4"></div>

      {/* Right side content area */}
      <div className="w-full lg:w-3/4 flex flex-col items-start justify-center p-8 pt-24">
        {/* Framer Motion div for fade-in animation */}
        <motion.div
          initial={{ opacity: 0 }} // Start with zero opacity
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }}    // Fade out on exit
          transition={{ duration: 0.5 }} // Animation duration
          className="w-full"
        >
          {/* About Me Section - No scroll animation */}
          <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
              <AboutMe />
            </div>
          </div>

          {/* Skills Section */}
          <Section>
            <Skills />
          </Section>

          {/* Timeline Section */}
          <Section>
            <Timeline />
          </Section>
        </motion.div>
      </div>
    </div>
  );
};

// Export the About component
export default About;