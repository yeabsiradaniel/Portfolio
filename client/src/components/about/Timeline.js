import React from 'react';
import { motion } from 'framer-motion'; // For animations

// An array of objects representing events in my professional journey.
const timelineData = [
  {
    year: '2025',
    title: 'Full-Stack Developer',
    company: 'Personal Project – Gara Bike',
    description: 'Built a full-featured bike-sharing app using Flutter and React, with real-time map tracking, authentication, subscriptions, and a custom admin dashboard.',
  },
  {
    year: '2025',
    title: 'Automation Developer',
    company: 'Personal Project',
    description: 'Created a Python-based automation tool that scrapes job posts from Telegram and auto-generates CVs and cover letters using Google Gemini.',
  },
  {
    year: '2024',
    title: 'Full-Stack Developer',
    company: 'Personal Project – E-commerce App (MERN)',
    description: 'Developed a full-stack e-commerce platform using MongoDB, Express, React, and Node.js with user auth, product management, and cart/checkout functionality.',
  },
  {
    year: '2024',
    title: 'React Developer',
    company: 'Gebeta Maps (gebeta.app)',
    description: 'Contributed to frontend development using React, enhancing UI components and user experience for a real-time mapping and location-based service platform.',
  },
  {
    year: '2024',
    title: 'Full-Stack Developer',
    company: 'Personal Project – User Profile App',
    description: 'Built a secure, role-based user management system with Flutter and Node.js, integrating file uploads via Cloudinary and JWT-based authentication.',
  },
  {
    year: '2023',
    title: 'Mobile App Developer',
    company: 'Personal/Freelance Projects',
    description: 'Developed multiple cross-platform mobile apps in Flutter, integrating Firebase, REST APIs, and responsive design.',
  },
];

/**
 * The Timeline component.
 * Displays a vertical timeline of my professional experience and projects.
 */
const Timeline = () => {
  return (
    <div className="text-center">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">My Journey</h2>
      
      {/* Timeline container */}
      <div className="relative max-w-3xl mx-auto">
        {/* The vertical line in the middle of the timeline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500 rounded-full opacity-30"></div>
        
        {/* Map through the timeline data to create each timeline item */}
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }} // Initial animation state
            whileInView={{ opacity: 1, y: 0 }} // Animate when the item comes into view
            viewport={{ amount: 0.5 }} // Trigger animation once when 50% is visible
            transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered delay for each item
            // Alternating layout for timeline items (left and right)
            className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
          >
            {/* Spacer div to push content to one side */}
            <div className="w-5/12"></div>
            
            {/* The circular year marker on the timeline */}
            <div className="z-20 flex items-center justify-center bg-blue-500 shadow-xl w-16 h-16 rounded-full">
              <span className="text-white font-bold text-xl">{item.year}</span>
            </div>
            
            {/* The content card for the timeline item */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4 transform hover:scale-105 transition-transform duration-300 transition-colors duration-800 ease-in-out text-left">
              <h3 className="font-sans font-bold text-2xl mb-1">{item.title}</h3>
              <h4 className="font-sans font-semibold text-lg text-blue-500 mb-2">{item.company}</h4>
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