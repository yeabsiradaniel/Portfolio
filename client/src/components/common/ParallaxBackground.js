import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

import dark1 from '../../assets/Dark_mode_layers/1_Top_layer.png';
import dark2 from '../../assets/Dark_mode_layers/2_Second_layer.png';
import dark3 from '../../assets/Dark_mode_layers/3_Third_layer.png';
import dark4 from '../../assets/Dark_mode_layers/4_Forth_layer.png';
import dark5 from '../../assets/Dark_mode_layers/5_Fifth_layer.png';
import dark6 from '../../assets/Dark_mode_layers/6_Bottom_layer.png';

import light1 from '../../assets/Ligh_mode_layers/1_Top_layer.png';
import light2 from '../../assets/Ligh_mode_layers/2_Second_layer.png';
import light3 from '../../assets/Ligh_mode_layers/3_Third_layer.png';
import light4 from '../../assets/Ligh_mode_layers/4_Forth_layer.png';
import light5 from '../../assets/Ligh_mode_layers/5_Fifth_layer.png';
import light6 from '../../assets/Ligh_mode_layers/6_Bottom_layer.png';

const layers = [
  { dark: dark6, light: light6, scrollSpeed: 0, mouseSpeed: 0 },
  { dark: dark5, light: light5, scrollSpeed: 0.1, mouseSpeed: 0.008 },
  { dark: dark4, light: light4, scrollSpeed: 0.25, mouseSpeed: 0.02 },
  { dark: dark3, light: light3, scrollSpeed: 0.45, mouseSpeed: 0.035 },
  { dark: dark2, light: light2, scrollSpeed: 0.65, mouseSpeed: 0.05 },
  { dark: dark1, light: light1, scrollSpeed: 0.85, mouseSpeed: 0.07 },
];

const scrollSpring = { stiffness: 120, damping: 20 };
const mouseSpring = { stiffness: 150, damping: 25 };

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

const ParallaxLayer = ({ dark, light, scrollSpeed, mouseSpeed, zIndex, isDarkMode, scrollY, mouseX, mouseY }) => {
  const rawScrollY = useTransform(scrollY, [0, 800], [0, -scrollSpeed * 300]);
  const y = useSpring(rawScrollY, scrollSpring);

  // tilt input on phones is subtler than a mouse, so amplify it
  const fx = isMobile() ? 110 : 60;
  const fy = isMobile() ? 55 : 30;
  const rawMouseX = useTransform(mouseX, (v) => -v * mouseSpeed * fx);
  const rawMouseY = useTransform(mouseY, (v) => -v * mouseSpeed * fy);
  const mx = useSpring(rawMouseX, mouseSpring);
  const my = useSpring(rawMouseY, mouseSpring);

  const bgSize = isMobile() ? 'cover' : '100% 100%';

  return (
    <motion.div
      style={{ y, x: mx, translateY: my, zIndex, willChange: 'transform' }}
      className="absolute inset-0"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${dark})`,
          backgroundSize: bgSize,
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          opacity: isDarkMode ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          // slight oversize to prevent edge gaps during mouse parallax
          margin: '-20px',
          padding: '20px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${light})`,
          backgroundSize: bgSize,
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          opacity: isDarkMode ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          margin: '-20px',
          padding: '20px',
        }}
      />
    </motion.div>
  );
};

const Particles = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef(null);

  const initParticles = useCallback((width, height) => {
    const count = isMobile() ? 30 : 55;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio > 1 ? 2 : 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      if (dpr > 1) {
        ctx.scale(2, 2);
      }
      initParticles(canvas.offsetWidth, canvas.offsetHeight);
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);

    let time = 0;
    const draw = () => {
      time += 1;
      const dispW = canvas.offsetWidth;
      const dispH = canvas.offsetHeight;
      ctx.clearRect(0, 0, dispW, dispH);

      particlesRef.current.forEach((p) => {
        // subtle drift toward mouse
        const dx = (mouseRef.current.x * dispW - p.x) * 0.0003;
        const dy = (mouseRef.current.y * dispH - p.y) * 0.0003;

        p.x += p.vx + dx;
        p.y += p.vy + dy;

        // wrap around
        if (p.y < -10) { p.y = dispH + 10; p.x = Math.random() * dispW; }
        if (p.x < -10) p.x = dispW + 10;
        if (p.x > dispW + 10) p.x = -10;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;

        if (isDarkMode) {
          // fireflies: warm golden glow
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, `rgba(255, 210, 80, ${alpha})`);
          gradient.addColorStop(0.4, `rgba(255, 180, 50, ${alpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(255, 180, 50, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          // bright core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 240, 180, ${alpha})`;
          ctx.fill();
        } else {
          // light mode: soft white/pink floating pollen
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
          gradient.addColorStop(0.5, `rgba(220, 190, 220, ${alpha * 0.3})`);
          gradient.addColorStop(1, 'rgba(220, 190, 220, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [isDarkMode, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: layers.length + 2 }}
    />
  );
};

const ParallaxBackground = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { scrollY } = useScroll();
  const mouseX = useSpring(0, mouseSpring);
  const mouseY = useSpring(0, mouseSpring);

  useEffect(() => {
    if (isMobile()) {
      // phones: drive the parallax from the gyroscope instead of the mouse.
      // Silently inactive on iOS until motion access is granted.
      const handleOrientation = (e) => {
        if (e.gamma == null || e.beta == null) return;
        mouseX.set(Math.max(-1, Math.min(1, e.gamma / 25)));
        mouseY.set(Math.max(-1, Math.min(1, (e.beta - 40) / 25)));
      };
      window.addEventListener('deviceorientation', handleOrientation, true);
      return () => window.removeEventListener('deviceorientation', handleOrientation, true);
    }
    const handleMouse = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          dark={layer.dark}
          light={layer.light}
          scrollSpeed={layer.scrollSpeed}
          mouseSpeed={layer.mouseSpeed}
          zIndex={index}
          isDarkMode={isDarkMode}
          scrollY={scrollY}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}

      {/* Particles layer */}
      <Particles isDarkMode={isDarkMode} />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-800"
        style={{
          zIndex: layers.length + 3,
          background: isDarkMode
            ? 'linear-gradient(to bottom, transparent 40%, rgba(69,94,61,0.85) 90%)'
            : 'linear-gradient(to bottom, transparent 40%, rgba(187,161,195,0.85) 90%)',
        }}
      />
      {/* Side vignette - mobile */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          zIndex: layers.length + 4,
          background: isDarkMode
            ? 'linear-gradient(to right, rgba(69,94,61,0.7) 0%, transparent 25%, transparent 75%, rgba(69,94,61,0.7) 100%)'
            : 'linear-gradient(to right, rgba(187,161,195,0.7) 0%, transparent 25%, transparent 75%, rgba(187,161,195,0.7) 100%)',
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
