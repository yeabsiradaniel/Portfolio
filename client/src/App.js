// Import necessary React and routing libraries
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Import layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Import routing and theme components
import AnimatedRoutes from './components/common/AnimatedRoutes';
import { ThemeProvider } from './hooks/useTheme';

/**
 * The main App component, which serves as the root of the application's UI.
 * It sets up the overall layout, routing, and theme management.
 */
function App() {
  return (
    // ThemeProvider wraps the entire application, providing theme context (e.g., dark/light mode)
    // to all descendant components.
    <ThemeProvider>
      {/* Router sets up the routing context for the application, enabling navigation. */}
      <Router>
        {/* Main application container with flex layout to ensure the footer sticks to the bottom. */}
        <div className="flex flex-col min-h-screen text-gray-900 dark:text-white transition-colors duration-800 ease-in-out">
          {/* Navbar component, displayed at the top of every page. */}
          <Navbar />

          {/* Main content area that grows to fill available space. */}
          <main className="flex-grow">
            {/* AnimatedRoutes handles the rendering of different pages based on the current URL,
                with page transition animations. */}
            <AnimatedRoutes />
          </main>

          {/* Footer component, displayed at the bottom of every page. */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

// Export the App component for use in index.js
export default App;
