import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AnimatedRoutes from './components/common/AnimatedRoutes';
import CustomCursor from './components/common/CustomCursor';
import Preloader from './components/common/Preloader';
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
