import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AnimatedRoutes from './components/common/AnimatedRoutes';
import CustomCursor from './components/common/CustomCursor';
import Preloader from './components/common/Preloader';
import ErrorBoundary from './components/common/ErrorBoundary';
import FluidSphereBackground from './components/3d/FluidSphereBackground';
import { ThemeProvider } from './hooks/useTheme';
import { initLenis } from './lib/scroll';

function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Preloader />
        {/* The WebGL scene gets its own boundary: if it ever crashes, the
            page keeps every word and only loses the decoration — a static
            stand-in keeps the name visible in that case. */}
        <ErrorBoundary
          fallback={
            <div className="fixed inset-0 -z-10 flex justify-center pointer-events-none" aria-hidden="true">
              <span
                className="mt-[12vh] font-heading font-bold text-gradient"
                style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)', lineHeight: '1.05' }}
              >
                Yeabsira Daniel
              </span>
            </div>
          }
        >
          <FluidSphereBackground />
        </ErrorBoundary>
        <CustomCursor />
        <div className="flex flex-col min-h-screen text-gray-900 dark:text-white transition-colors duration-800 ease-in-out">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
