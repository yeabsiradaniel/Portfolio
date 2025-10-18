// Import necessary libraries and hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { motion } from 'framer-motion'; // For animations
import axios from 'axios'; // For making HTTP requests

/**
 * The AdminLogin page component.
 * Provides a form for the administrator to log in.
 */
const AdminLogin = () => {
  // State for form data (username and password)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  // State for storing login error messages
  const [error, setError] = useState('');
  // Hook for navigation
  const navigate = useNavigate();

  // Destructure username and password from the formData state
  const { username, password } = formData;

  /**
   * Handles changes in the form input fields.
   * Updates the formData state with the new value.
   * @param {object} e - The event object from the input field.
   */
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handles the form submission.
   * Sends a POST request to the server to authenticate the admin.
   * @param {object} e - The form submission event object.
   */
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send a POST request to the /admin/login endpoint
      const res = await axios.post('/admin/login', { username, password });
      
      // If login is successful, store the received token in localStorage
      localStorage.setItem('token', res.data.token);
      
      // Navigate to the admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      // If there's an error (e.g., invalid credentials), set an error message
      setError('Invalid credentials');
      console.error(err); // Log the full error for debugging
    }
  };

  return (
    // Main container with fade-in animation and centered content
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white transition-colors duration-300">
          Admin Login
        </h2>
        {/* Login Form */}
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            />
          </div>
          {/* Display error message if login fails */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// Export the AdminLogin component
export default AdminLogin;