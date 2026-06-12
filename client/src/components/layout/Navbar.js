import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';
import { scrollToId } from '../../lib/scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToId(id), 100);
    } else {
      scrollToId(id);
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

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-[#BBA1C3]/80 dark:bg-[#455E3D]/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => scrollToSection('home')} className="cursor-pointer">
                <img src={logo} alt="MyPortfolio Logo" className="h-14" />
              </button>
            </div>

            {!isAdminPage && (
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-4 py-2 text-sm font-medium font-sans transition-colors duration-300 rounded-lg ${
                      activeSection === link.id
                        ? 'text-accent'
                        : 'text-gray-700 dark:text-gray-300 hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {link.title}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {!isAdminPage && (
                <div className="md:hidden">
                  <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-200 focus:outline-none">
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

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={panelVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-[#BBA1C3]/95 dark:bg-[#455E3D]/95 backdrop-blur-xl z-50 md:hidden shadow-2xl border-l border-white/10"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-200 focus:outline-none">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col items-center pt-8 space-y-2 px-6">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full text-center py-3 px-4 rounded-xl text-lg font-semibold font-sans transition-all duration-300 ${
                      activeSection === link.id
                        ? 'text-accent bg-accent/10'
                        : 'hover:text-accent hover:bg-accent/5'
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
