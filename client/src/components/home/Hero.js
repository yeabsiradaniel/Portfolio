import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from '../common/ParallaxBackground';
import FlipWords from '../common/FlipWords';

const Hero = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-transparent transition-colors duration-800 ease-in-out"
      style={{ marginTop: '-64px', paddingTop: '64px' }}
    >
      {/* Parallax Background - scoped to hero section */}
      <ParallaxBackground />

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex items-center">
        {/* Left side spacer (for large screens) */}
        <div className="hidden lg:block lg:w-1/4"></div>

        {/* Right side with the main text content */}
        <div className="w-full lg:w-3/4 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-4xl w-full text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
            >
              <h1
                className="font-heading font-bold mb-4 text-black dark:text-white transition-colors duration-300"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 8rem)',
                  textShadow: 'var(--hero-shadow)',
                }}
              >
                Yeabsira Daniel
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.6 }}
            >
              <h2
                className="font-heading font-semibold mb-6 text-accent"
                style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)',
                  textShadow: 'var(--hero-shadow)',
                }}
              >
                I Build <FlipWords words={['Modern', 'Scalable', 'Beautiful', 'Performant']} /> Applications
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.9 }}
            >
              <p
                className="text-base lg:text-xl text-gray-900 dark:text-gray-100 mb-8 font-sans max-w-2xl mx-auto lg:ml-auto lg:mr-0 transition-colors duration-300"
                style={{ textShadow: 'var(--hero-shadow-sm)' }}
              >
                I build modern mobile and web applications using Flutter, MERN stack, and Python automation. Passionate about turning ideas into clean, scalable, real-world solutions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent-hover text-white font-bold py-4 px-10 rounded-full text-lg transition-colors duration-300 font-sans"
              >
                View My Work
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
