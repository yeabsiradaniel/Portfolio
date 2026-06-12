import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'intro-played';

// Short first-visit intro: name reveal with a progress counter, then the
// curtain lifts. Plays once per browser session, never for reduced motion.
const Preloader = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = 'hidden';

    const start = performance.now();
    const DURATION = 1400;
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-out so the counter sprints early and settles at the end
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          sessionStorage.setItem(SESSION_KEY, '1');
          setShow(false);
          document.documentElement.style.overflow = '';
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = '';
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#BBA1C3] dark:bg-[#455E3D]"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              className="font-heading font-bold text-gradient"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.1 }}
            >
              Yeabsira Daniel
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-4 font-sans text-sm tracking-[0.3em] uppercase text-gray-800/70 dark:text-gray-200/70"
          >
            Flutter & Full-Stack Developer
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-10 right-10 font-heading font-semibold text-2xl text-gray-900/50 dark:text-white/50 tabular-nums"
          >
            {count}%
          </motion.span>
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-accent"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
