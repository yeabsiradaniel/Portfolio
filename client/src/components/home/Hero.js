import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import ParallaxBackground from '../common/ParallaxBackground';
import FlipWords from '../common/FlipWords';

const socialLinks = [
  { icon: <FaGithub className="h-5 w-5" />, href: 'https://github.com/yeabsiradaniel', label: 'GitHub' },
  { icon: <FaLinkedin className="h-5 w-5" />, href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373', label: 'LinkedIn' },
  { icon: <EnvelopeIcon className="h-5 w-5" />, href: 'mailto:yeabsirad9@gmail.com', label: 'Email' },
];

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

      {/* Social links — left edge, desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-5"
      >
        <div className="w-px h-16 bg-gray-900/30 dark:bg-white/30" />
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-gray-900/70 dark:text-white/70 hover:text-accent transition-colors duration-300"
            style={{ textShadow: 'var(--hero-shadow-sm)' }}
          >
            {link.icon}
          </a>
        ))}
        <div className="w-px h-16 bg-gray-900/30 dark:bg-white/30" />
      </motion.div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2"
      >
        <span className="text-xs font-sans tracking-widest uppercase text-gray-900/60 dark:text-white/60" style={{ textShadow: 'var(--hero-shadow-sm)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-gray-900/40 dark:border-white/40 flex justify-center pt-1"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-gray-900/60 dark:bg-white/60"
          />
        </motion.div>
      </motion.div>

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
                I Build <FlipWords words={['Cross-Platform', 'Production-Ready', 'Scalable']} /> Applications
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
                Flutter mobile developer and MERN full-stack engineer. I ship cross-platform apps with clean architecture, real API integrations, and production deployment pipelines. Based in Addis Ababa — available for remote contract work worldwide.
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
