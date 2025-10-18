import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { motion } from 'framer-motion'; // For animations

/**
 * The ContactForm component.
 * Provides a form for users to send a message.
 * Handles form state, submission, and displays status messages.
 */
const ContactForm = () => {
  // State to manage the form's input data (name, email, message)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // State to display the status of the form submission (e.g., "Sending...", "Message sent")
  const [status, setStatus] = useState('');

  /**
   * Handles changes in the form input fields.
   * Updates the formData state with the new value for the corresponding field.
   * @param {object} e - The event object from the input or textarea.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the form submission.
   * Sends the form data to the backend API.
   * @param {object} e - The form submission event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser refresh on form submission
    setStatus('Sending...'); // Update status to show the form is being submitted
    try {
      // Send a POST request to the '/api/contact' endpoint with the form data
      await axios.post('/api/contact', formData);
      setStatus('Message sent successfully!'); // Update status on success
      // Clear the form fields after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message. Please try again.'); // Update status on failure
      console.error('Error submitting form:', error); // Log the error for debugging
    }
  };

  return (
    // Animated container for the form
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6 font-sans">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
          />
        </div>
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
          />
        </div>
        {/* Message Textarea */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
          ></textarea>
        </div>
        {/* Submit Button */}
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send Message
          </motion.button>
        </div>
      </form>
      {/* Display the submission status message */}
      {status && <p className="mt-4 text-center font-sans">{status}</p>}
    </motion.div>
  );
};

export default ContactForm;
