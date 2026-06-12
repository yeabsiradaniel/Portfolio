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
      <ParallaxBackground />

      {/* Decorative floating orbs */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-[15%] w-48 h-48 rounded-full bg-purple-500/10 dark:bg-teal-500/10 blur-3xl animate-float-delayed" />
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-900/30 dark:via-white/30 to-transparent" />
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-gray-900/70 dark:text-white/70 hover:text-accent hover:bg-accent/10 transition-colors duration-300"
            style={{ textShadow: 'var(--hero-shadow-sm)' }}
          >
            {link.icon}
          </motion.a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-900/30 dark:via-white/30 to-transparent" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2 group"
      >
        <span className="text-xs font-sans tracking-widest uppercase text-gray-900/60 dark:text-white/60 group-hover:text-accent transition-colors duration-300" style={{ textShadow: 'var(--hero-shadow-sm)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-gray-900/40 dark:border-white/40 flex justify-center pt-1 group-hover:border-accent transition-colors duration-300"
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
        <div className="hidden lg:block lg:w-1/4"></div>

        <div className="w-full lg:w-3/4 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-4xl w-full text-center lg:text-right">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 lg:ml-auto"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-sans font-medium text-gray-700 dark:text-gray-200">Available for remote work</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
            >
              <h1
                className="font-heading font-bold mb-4 text-gradient transition-colors duration-300"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                  lineHeight: '1.05',
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
                className="font-heading font-semibold mb-6 text-gray-800 dark:text-gray-100"
                style={{
                  fontSize: 'clamp(1.15rem, 3.5vw, 2rem)',
                  textShadow: 'var(--hero-shadow-sm)',
                }}
              >
                I Build <span className="text-accent"><FlipWords words={['Cross-Platform', 'Production-Ready', 'Scalable']} /></span> Applications
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.9 }}
            >
              <p
                className="text-base lg:text-lg text-gray-800/90 dark:text-gray-200/90 mb-10 font-sans max-w-2xl mx-auto lg:ml-auto lg:mr-0 transition-colors duration-300 leading-relaxed"
                style={{ textShadow: 'var(--hero-shadow-sm)' }}
              >
                Flutter mobile developer and full-stack engineer with production apps on Google Play Store. I build cross-platform mobile apps, REST APIs, and web applications for clients and companies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end"
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative bg-accent hover:bg-accent-hover text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 font-sans glow-accent"
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="py-4 px-10 rounded-full text-lg font-bold font-sans border-2 border-gray-900/20 dark:border-white/20 hover:border-accent hover:text-accent transition-all duration-300 text-gray-800 dark:text-gray-200"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
