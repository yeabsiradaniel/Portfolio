import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A component to protect routes that require authentication.
 * It checks for the presence of an authentication token in localStorage.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The component(s) to render if the user is authenticated.
 * @returns {React.ReactNode} If authenticated, it renders the children. Otherwise, it navigates to the login page.
 */
const PrivateRoute = ({ children }) => {
  // Check for the authentication token in the browser's localStorage.
  const token = localStorage.getItem('token');

  // If a token exists, render the child components that were passed into this route.
  // If no token exists, use the Navigate component from react-router-dom to redirect the user to the admin login page.
  return token ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;