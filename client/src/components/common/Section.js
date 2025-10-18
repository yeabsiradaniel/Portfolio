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
      initial={{ opacity: 0, y: 50 }} // Initial state: transparent and 50px down
      whileInView={{ opacity: 1, y: 0 }} // Animate to: opaque and at its original position when it enters the viewport
      viewport={{ once: true, amount: 0.3 }} // Trigger the animation once when 30% of the section is visible
      transition={{ duration: 0.8 }} // The animation should take 0.8 seconds
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
