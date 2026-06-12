import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineData = [
  {
    year: '2026',
    title: 'Flutter Developer',
    company: 'ShegerWalk (NDA, Play Store Beta)',
    description: 'Building a gamified step-tracking app for a client using Flutter, Django, PostgreSQL, and FCM. Features native pedometer integration, GPS-mapped walks, and milestone challenges.',
  },
  {
    year: '2025',
    title: 'Flutter Developer',
    company: 'BudgetSMS, Expense Tracker',
    description: 'Built a personal finance app that parses bank SMS notifications from multiple Ethiopian banks, automatically categorizes transactions, and enforces a 50/30/20 budget split.',
  },
  {
    year: '2025',
    title: 'React Developer',
    company: 'Gebeta Maps (gebeta.app)',
    description: 'Led frontend development of mapping UI components for a production navigation API platform serving delivery clients including Adika and Tikus in Addis Ababa.',
  },
  {
    year: '2025',
    title: 'Flutter Developer',
    company: 'TaskFlow, Task Management App',
    description: 'Developed an offline-first task manager with Firestore cloud sync, BLoC state management, Firebase Auth, color-coded categories, and scheduled notifications.',
  },
  {
    year: '2024',
    title: 'Full-Stack Developer',
    company: 'Freelance Client Projects',
    description: 'Delivered mobile and web solutions for local businesses including a restaurant ordering system and an inventory management tool using Flutter, Node.js, and MongoDB.',
  },
  {
    year: '2024',
    title: 'Mobile Developer',
    company: 'Freelance, Multiple Clients',
    description: 'Built cross-platform mobile applications for small businesses and startups using Flutter with Firebase backend services, REST API integrations, and Play Store deployment.',
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.6'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm uppercase tracking-widest text-accent font-sans font-semibold mb-2">Experience</h2>
        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-12">My Journey</h3>
      </motion.div>

      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        {/* Static background line */}
        <div className="absolute h-full w-0.5 bg-gray-300/40 dark:bg-gray-600/40 rounded-full transform left-5 md:left-1/2 md:-translate-x-1/2 transition-colors duration-800"></div>
        {/* Animated gradient fill line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute w-0.5 rounded-full transform left-5 md:left-1/2 md:-translate-x-1/2 bg-gradient-to-b from-accent via-purple-500 to-pink-500 dark:from-accent dark:via-emerald-400 dark:to-cyan-400"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent blur-sm" />
        </motion.div>

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`mb-8 flex justify-between items-center w-full md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Mobile Layout */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className="md:hidden z-20 flex-shrink-0 flex items-center justify-center bg-accent shadow-lg shadow-accent/25 w-10 h-10 rounded-full"
            >
              <span className="text-white font-bold text-xs font-sans">{item.year}</span>
            </motion.div>
            <div className="md:hidden glass-card rounded-xl flex-1 ml-3 px-4 py-3 text-left">
              <h3 className="font-sans font-bold text-sm mb-0.5">{item.title}</h3>
              <h4 className="font-sans font-semibold text-xs text-accent mb-1">{item.company}</h4>
              <p className="font-sans text-xs text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{item.description}</p>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block w-5/12"></div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
              className="hidden md:flex z-20 items-center justify-center bg-accent shadow-lg shadow-accent/25 w-14 h-14 rounded-full"
            >
              <span className="text-white font-bold text-lg font-sans">{item.year}</span>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="hidden md:block glass-card rounded-2xl w-5/12 px-6 py-5 text-left cursor-default"
            >
              <h3 className="font-sans font-bold text-xl mb-1">{item.title}</h3>
              <h4 className="font-sans font-semibold text-sm text-accent mb-2">{item.company}</h4>
              <p className="font-sans text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
