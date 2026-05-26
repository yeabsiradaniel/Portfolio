import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

// Dark mode layers
import dark1 from '../../assets/Dark_mode_layers/1_Top_layer.png';
import dark2 from '../../assets/Dark_mode_layers/2_Second_layer.png';
import dark3 from '../../assets/Dark_mode_layers/3_Third_layer.png';
import dark4 from '../../assets/Dark_mode_layers/4_Forth_layer.png';
import dark5 from '../../assets/Dark_mode_layers/5_Fifth_layer.png';
import dark6 from '../../assets/Dark_mode_layers/6_Bottom_layer.png';

// Light mode layers
import light1 from '../../assets/Ligh_mode_layers/1_Top_layer.png';
import light2 from '../../assets/Ligh_mode_layers/2_Second_layer.png';
import light3 from '../../assets/Ligh_mode_layers/3_Third_layer.png';
import light4 from '../../assets/Ligh_mode_layers/4_Forth_layer.png';
import light5 from '../../assets/Ligh_mode_layers/5_Fifth_layer.png';
import light6 from '../../assets/Ligh_mode_layers/6_Bottom_layer.png';

// Layer config: bottom (farthest) to top (closest)
// Increased speeds for more visible parallax effect
const layers = [
  { dark: dark6, light: light6, speed: 0 },      // Sky fill - static
  { dark: dark5, light: light5, speed: 0.1 },     // Stars & clouds
  { dark: dark4, light: light4, speed: 0.25 },    // Far mountains
  { dark: dark3, light: light3, speed: 0.45 },    // Near mountains
  { dark: dark2, light: light2, speed: 0.65 },    // Ground/fog
  { dark: dark1, light: light1, speed: 0.85 },    // Birch trees - fastest
];

const springConfig = { stiffness: 120, damping: 20 };

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const ParallaxLayer = ({ dark, light, speed, zIndex, isDarkMode, scrollY }) => {
  // Scroll range matches ~1 viewport height; larger multiplier = more dramatic movement
  const rawY = useTransform(scrollY, [0, 800], [0, -speed * 300]);
  const y = useSpring(rawY, springConfig);

  // On mobile, use cover to preserve aspect ratio; on desktop, stretch to fill
  const bgSize = isMobile() ? 'cover' : '100% 100%';

  return (
    <motion.div
      style={{ y, zIndex, willChange: 'transform' }}
      className="absolute inset-0"
    >
      {/* Dark mode layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${dark})`,
          backgroundSize: bgSize,
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          opacity: isDarkMode ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      />
      {/* Light mode layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${light})`,
          backgroundSize: bgSize,
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          opacity: isDarkMode ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
        }}
      />
    </motion.div>
  );
};

const ParallaxBackground = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          dark={layer.dark}
          light={layer.light}
          speed={layer.speed}
          zIndex={index}
          isDarkMode={isDarkMode}
          scrollY={scrollY}
        />
      ))}
      {/* Bottom vignette — fades lower portion into theme color for text readability */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-800"
        style={{
          zIndex: layers.length,
          background: isDarkMode
            ? 'linear-gradient(to bottom, transparent 40%, rgba(69,94,61,0.85) 90%)'
            : 'linear-gradient(to bottom, transparent 40%, rgba(187,161,195,0.85) 90%)',
        }}
      />
      {/* Side vignette — mobile only, fades birch trees on edges */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          zIndex: layers.length + 1,
          background: isDarkMode
            ? 'linear-gradient(to right, rgba(69,94,61,0.7) 0%, transparent 25%, transparent 75%, rgba(69,94,61,0.7) 100%)'
            : 'linear-gradient(to right, rgba(187,161,195,0.7) 0%, transparent 25%, transparent 75%, rgba(187,161,195,0.7) 100%)',
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
