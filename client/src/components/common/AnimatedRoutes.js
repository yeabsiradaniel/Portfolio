// Import necessary libraries and components
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // For exit animations

// Import page components
import Home from '../../pages/Home';
import About from '../../pages/About';
import Projects from '../../pages/Projects';
import Contact from '../../pages/Contact';
import AdminLogin from '../../pages/AdminLogin';
import AdminDashboard from '../../pages/AdminDashboard';

// Import the PrivateRoute component for protecting admin routes
import PrivateRoute from './PrivateRoute';

/**
 * AnimatedRoutes component manages all the application's routing and
 * implements page transition animations using Framer Motion.
 */
const AnimatedRoutes = () => {
  // `useLocation` hook from react-router-dom gives us the current location object.
  // This is key for AnimatePresence to track when the route changes.
  const location = useLocation();

  return (
    // AnimatePresence enables the animation of components that have been removed from the tree.
    // The `mode="wait"` prop ensures that the exiting component finishes its animation
    // before the new component enters.
    <AnimatePresence mode="wait">
      {/* The `Routes` component defines the routing configuration.
          We pass the `location` and a unique `key` to it, so AnimatePresence
          can detect when the page changes and trigger animations. */}
      <Routes location={location} key={location.pathname}>
        {/* Define a route for the Home page */}
        <Route path="/" element={<Home />} />

        {/* Define a route for the About page */}
        <Route path="/about" element={<About />} />

        {/* Define a route for the Projects page */}
        <Route path="/projects" element={<Projects />} />

        {/* Define a route for the Contact page */}
        <Route path="/contact" element={<Contact />} />

        {/* Define a route for the Admin Login page */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Define a protected route for the Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            // The PrivateRoute component wraps the AdminDashboard.
            // It will only render the AdminDashboard if the user is authenticated.
            // Otherwise, it will redirect them to the login page.
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Export the component for use in App.js
export default AnimatedRoutes;