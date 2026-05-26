import React from 'react';
import { motion } from 'framer-motion'; // For animations

/**
 * A reusable Section component with a standardized layout and entrance animation.
 * It provides consistent padding and a fade-in-from-bottom animation for its content.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the section.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the section.
 */
const Section = ({ children, className }) => {
  return (
    // The `motion.section` component from Framer Motion enables animations on the section element.
    <motion.section
      // Animation properties
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      // CSS classes for styling
      className={`py-16 sm:py-24 ${className}`}>
      {/* A centered container for the content */}
      <div className="container mx-auto px-4">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
