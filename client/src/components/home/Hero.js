import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import FlipWords from '../common/FlipWords';
import Magnetic from '../common/Magnetic';
import { scrollToId } from '../../lib/scroll';

const socialLinks = [
  { icon: <FaGithub className="h-5 w-5" />, href: 'https://github.com/yeabsiradaniel', label: 'GitHub' },
  { icon: <FaLinkedin className="h-5 w-5" />, href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373', label: 'LinkedIn' },
  { icon: <EnvelopeIcon className="h-5 w-5" />, href: 'mailto:yeabsirad9@gmail.com', label: 'Email' },
];

/**
 * Hero: the fluid sphere owns the exact center of the screen and the content
 * circles it on four sides — name above, pitch to the right, CTAs below,
 * socials to the left. Every block enters by traveling outward from the
 * screen center, so the composition unfolds from the sphere.
 * On small screens the sides collapse into a top/bottom stack.
 */
const Hero = () => {
  const scrollToSection = (id) => scrollToId(id);

  const tagline = (
    <h2
      className="font-heading font-semibold text-white lg:text-gray-950 dark:text-gray-100"
      style={{
        fontSize: 'clamp(1.1rem, 2.4vw, 1.6rem)',
        textShadow: 'var(--hero-shadow-sm)',
      }}
    >
      I Build <span className="text-accent"><FlipWords words={['Cross-Platform', 'Production-Ready', 'Scalable']} /></span> Applications
    </h2>
  );

  const intro = (
    <p
      className="text-sm lg:text-base text-white/90 lg:text-gray-900 dark:text-gray-200/90 font-sans transition-colors duration-300 leading-relaxed"
      style={{ textShadow: 'var(--hero-shadow-sm)' }}
    >
      Flutter mobile developer and full-stack engineer with production apps on Google Play Store. I build cross-platform mobile apps, REST APIs, and web applications for clients and companies.
    </p>
  );

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-transparent transition-colors duration-800 ease-in-out"
      style={{ marginTop: '-64px', paddingTop: '64px' }}
    >
      {/* North: badge (the name itself is rendered inside the 3D scene,
          sandwiched between the studio backdrop and the sphere) */}
      <motion.div
        initial={{ opacity: 0, x: '-50%', y: '24vh', scale: 0.6 }}
        animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
        className="absolute top-[6%] sm:top-[7%] left-1/2 z-10 w-full px-4 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          <span className="text-sm font-sans font-medium text-gray-700 dark:text-gray-200">Available for remote work</span>
        </div>
      </motion.div>

      {/* East: pitch (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: '-30vw', y: '-50%', scale: 0.7 }}
        animate={{ opacity: 1, x: 0, y: '-50%', scale: 1 }}
        transition={{ delay: 1.15, duration: 0.9, ease: 'easeOut' }}
        className="hidden lg:flex absolute right-10 xl:right-16 top-1/2 z-10 max-w-xs xl:max-w-sm flex-col gap-4 text-right"
      >
        {tagline}
        {intro}
      </motion.div>

      {/* South: CTAs */}
      <motion.div
        initial={{ opacity: 0, x: '-50%', y: '-24vh', scale: 0.6 }}
        animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
        transition={{ delay: 1.35, duration: 0.9, ease: 'easeOut' }}
        className="absolute bottom-[11%] sm:bottom-[8%] left-1/2 z-10 w-full max-w-2xl px-4 text-center"
      >
        {/* pitch stacks here on small screens */}
        <div className="lg:hidden flex flex-col gap-3 mb-6">
          {tagline}
          {intro}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Magnetic strength={0.25}>
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileTap={{ scale: 0.97 }}
              className="relative bg-accent hover:bg-accent-hover text-on-accent font-bold py-4 px-10 rounded-full text-lg transition-colors duration-300 font-sans glow-accent w-full sm:w-auto"
            >
              View My Work
            </motion.button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileTap={{ scale: 0.97 }}
              className="py-4 px-10 rounded-full text-lg font-bold font-sans border-2 border-white/50 dark:border-white/20 hover:border-accent hover:text-accent transition-colors duration-300 text-white dark:text-gray-200 w-full sm:w-auto"
            >
              Contact Me
            </motion.button>
          </Magnetic>
        </div>

        {/* Mobile social links */}
        <div className="flex lg:hidden justify-center gap-3 mt-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-3 rounded-xl glass-card text-gray-800 dark:text-gray-200 hover:text-accent transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </motion.div>

      {/* West: social links (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: '30vw', y: '-50%' }}
        animate={{ opacity: 1, x: 0, y: '-50%' }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex absolute left-10 xl:left-16 top-1/2 z-20 flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-white/80 dark:text-white/70 hover:text-accent hover:bg-accent/10 transition-colors duration-300"
            style={{ textShadow: 'var(--hero-shadow-sm)' }}
          >
            {link.icon}
          </motion.a>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </motion.div>

      {/* Scroll indicator: bottom-right, clear of the centered scene controls */}
      <motion.div
        initial={{ opacity: 0, y: '-35vh' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.8, ease: 'easeOut' }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 right-6 z-20 cursor-pointer hidden sm:flex flex-col items-center gap-2 group"
      >
        <span className="text-xs font-sans tracking-widest uppercase text-white/60 dark:text-white/60 group-hover:text-accent transition-colors duration-300" style={{ textShadow: 'var(--hero-shadow-sm)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-white/40 dark:border-white/40 flex justify-center pt-1 group-hover:border-accent transition-colors duration-300"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-white/60 dark:bg-white/60"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
