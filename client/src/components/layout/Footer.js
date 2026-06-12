import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFileDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import RevealText from '../common/RevealText';
import { scrollToId } from '../../lib/scroll';

const Footer = () => {
  const socials = [
    { icon: FaGithub, href: 'https://github.com/yeabsiradaniel', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/yeabsiradaniel', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#BBA1C3] dark:bg-[#455E3D] transition-colors duration-800 ease-in-out">
      <div className="flex justify-center">
        <div className="w-3/5 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />
      </div>

      {/* Big closing CTA */}
      <div className="container mx-auto px-4 pt-16 pb-12 text-center">
        <p className="text-sm uppercase tracking-widest text-accent font-sans font-semibold mb-4">
          What's next?
        </p>
        <h2 className="font-heading font-bold text-gradient mx-auto max-w-3xl mb-6" style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)', lineHeight: 1.15 }}>
          <RevealText>Have a project in mind? Let's build something together.</RevealText>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-sans max-w-xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
          I'm open to remote contract and full-time roles. Send a message and I'll get back to you within a day.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Magnetic strength={0.25}>
            <motion.button
              onClick={() => scrollToId('contact')}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full bg-accent hover:bg-accent-hover text-white font-sans font-bold transition-colors duration-300 glow-accent"
            >
              Start a Conversation
            </motion.button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <motion.a
              href="/resume.pdf"
              download="Yeabsira-Daniel-Resume.pdf"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-bold border-2 border-gray-900/20 dark:border-white/20 hover:border-accent hover:text-accent text-gray-800 dark:text-gray-200 transition-colors duration-300"
            >
              <FaFileDownload className="h-4 w-4" />
              Download Resume
            </motion.a>
          </Magnetic>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-900/10 dark:border-white/10 pt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans transition-colors duration-300">
            &copy; {new Date().getFullYear()} Yeabsira Daniel
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 font-sans">
            Addis Ababa, Ethiopia (UTC+3)
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <Magnetic key={href} strength={0.4}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
