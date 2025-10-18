import React from 'react';
import { motion } from 'framer-motion'; // For animations

/**
 * The AboutMe component.
 * Displays a profile picture, a headline, and a paragraph of text about me.
 */
const AboutMe = () => {
  return (
    <div className="text-center">
      {/* Animated container for the profile picture */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} // Initial animation state
        animate={{ scale: 1, opacity: 1 }}   // Final animation state
        transition={{ duration: 0.8, ease: 'easeOut' }} // Animation timing and easing
        className="inline-block mb-8"
      >
        {/* Profile picture */}
        <img
          src="/images/profile.jpg"
          alt="Yeabsira Daniel"
          className="rounded-full w-48 h-48 object-cover shadow-lg border-4 border-white dark:border-gray-800 transform hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
      
      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">About Me</h1>
      
      {/* Introduction paragraph */}
      <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-800 ease-in-out font-sans">
        I'm a passionate full-stack developer driven by a love for building clean, functional, and impactful digital solutions. With a focus on Flutter for mobile and the MERN stack for web, I enjoy turning ideas into scalable products. I’m especially drawn to automation, creating tools that save time and improve workflows. Whether it’s launching a full ride-sharing app or streamlining job applications with Python, I bring creativity, technical skill, and a problem-solving mindset to every project.
      </p>
    </div>
  );
};

// Export the AboutMe component
export default AboutMe;