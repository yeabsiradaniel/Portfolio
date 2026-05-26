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
        {/* Profile picture with rotating gradient border */}
        <div className="relative w-52 h-52 rounded-full p-1 animate-spin-slow bg-gradient-to-tr from-accent via-purple-500 to-pink-500">
          <div className="rounded-full w-full h-full animate-spin-slow" style={{ animationDirection: 'reverse' }}>
            <img
              src="/images/profile.jpg"
              alt="Yeabsira Daniel"
              className="rounded-full w-full h-full object-cover shadow-lg border-4 border-white dark:border-gray-800"
            />
          </div>
        </div>
      </motion.div>
      
      {/* Headline */}
      <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>About Me</h1>
      
      {/* Introduction paragraph */}
      <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-800 ease-in-out font-sans">
        I specialize in Flutter mobile development and full-stack web applications. I’m currently building a step-tracking mobile app for a company using Flutter, Django, PostgreSQL, and Firebase Cloud Messaging, shipping to the Play Store in beta. Previously, I contributed production React components to Gebeta Maps (gebeta.app), a mapping platform serving real users. I architect Flutter apps using BLoC state management, clean layered architecture, and CI/CD deployment. On the web side, I build full-stack applications with Node.js, Express, MongoDB, and React, with proper authentication, file handling, and API design. I’m based in Addis Ababa, Ethiopia (UTC+3), overlapping with European and Middle Eastern business hours.
      </p>
    </div>
  );
};

// Export the AboutMe component
export default AboutMe;