import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// An array of objects representing events in my professional journey.
const timelineData = [
  {
    year: '2026',
    title: 'Flutter Developer',
    company: 'Step Tracking App (NDA, Play Store Beta)',
    description: 'Building a cross-platform step-tracking mobile application for a client using Flutter, Django, PostgreSQL, and Firebase Cloud Messaging. Currently shipping to the Google Play Store in beta.',
  },
  {
    year: '2025',
    title: 'React Developer',
    company: 'Gebeta Maps (gebeta.app)',
    description: 'Contributed to frontend development for a production mapping and location-based service platform, building and enhancing React UI components used by real users.',
  },
  {
    year: '2024',
    title: 'Flutter & Full-Stack Developer',
    company: 'Independent Projects',
    description: 'Built and deployed cross-platform mobile apps and full-stack web applications using Flutter with BLoC architecture, the MERN stack, and cloud deployment pipelines.',
  },
];

/**
 * The Timeline component.
 * Displays a vertical timeline of my professional experience and projects.
 */
const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.6'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="text-center">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">My Journey</h2>

      {/* Timeline container */}
      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        {/* Static background line */}
        <div className="absolute h-full w-1 bg-gray-300 dark:bg-gray-600 rounded-full opacity-30 transform left-5 md:left-1/2 md:-translate-x-1/2 transition-colors duration-800"></div>
        {/* Animated gradient fill line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute w-1 rounded-full transform left-5 md:left-1/2 md:-translate-x-1/2 bg-gradient-to-b from-accent via-purple-500 to-pink-500"
        />
        
        {/* Map through the timeline data to create each timeline item */}
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }} // Initial animation state
            whileInView={{ opacity: 1, y: 0 }} // Animate when the item comes into view
            viewport={{ amount: 0.5 }} // Trigger animation once when 50% is visible
            transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered delay for each item
            // Alternating layout for timeline items (left and right)
            className={`mb-8 flex justify-between items-center w-full md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* --- Mobile Layout --- */}
            {/* On mobile, content is on the right, and there's a small spacer on the left */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className="md:hidden z-20 flex-shrink-0 flex items-center justify-center bg-accent shadow-xl w-10 h-10 rounded-full"
            >
              <span className="text-white font-bold text-sm">{item.year}</span>
            </motion.div>
            <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl flex-1 ml-3 px-4 py-3 transition-colors duration-800 ease-in-out text-left">
              <h3 className="font-sans font-bold text-base mb-1">{item.title}</h3>
              <h4 className="font-sans font-semibold text-sm text-accent mb-1">{item.company}</h4>
              <p className="font-sans text-xs text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-800 ease-in-out">{item.description}</p>
            </div>

            {/* --- Desktop Layout --- */}
            {/* On desktop, a spacer pushes content to either side */}
            <div className="hidden md:block w-5/12"></div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className="hidden md:flex z-20 items-center justify-center bg-accent shadow-xl w-16 h-16 rounded-full"
            >
              <span className="text-white font-bold text-xl">{item.year}</span>
            </motion.div>
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4 transform hover:scale-105 transition-transform duration-300 transition-colors duration-800 ease-in-out text-left">
              <h3 className="font-sans font-bold text-2xl mb-1">{item.title}</h3>
              <h4 className="font-sans font-semibold text-lg text-accent mb-2">{item.company}</h4>
              <p className="font-sans text-base text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-800 ease-in-out">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Export the Timeline component
export default Timeline;