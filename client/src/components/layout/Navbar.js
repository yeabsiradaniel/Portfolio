import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll position for frosted glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', id: 'home' },
    { title: 'About', id: 'about' },
    { title: 'Projects', id: 'projects' },
    { title: 'Contact', id: 'contact' },
  ];

  // Track which section is in view for active link highlighting
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sectionIds = ['home', 'about', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = (id) => {
    // If on an admin page, navigate home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const panelVariants = {
    closed: { x: '100%' },
    open: { x: '0%' },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  // Don't show section nav on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <nav className={`sticky top-0 z-50 border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-[#BBA1C3]/70 dark:bg-[#455E3D]/70 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={() => scrollToSection('home')} className="cursor-pointer">
                <img src={logo} alt="MyPortfolio Logo" className="h-14" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            {!isAdminPage && (
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-lg font-medium transition-colors duration-300 ${
                      activeSection === link.id ? 'text-accent' : 'hover:text-accent'
                    }`}
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            )}

            {/* Right side: Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center">
              <ThemeToggle />
              {!isAdminPage && (
                <div className="md:hidden ml-4">
                  <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                    {isOpen ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Panel */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={panelVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-[#BBA1C3] dark:bg-[#455E3D] z-50 md:hidden shadow-2xl"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsOpen(false)} className="focus:outline-none">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col items-center pt-12 space-y-8">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      activeSection === link.id ? 'text-accent' : 'hover:text-accent'
                    }`}
                  >
                    {link.title}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
