// Import necessary libraries and components
import React from 'react';
import { motion } from 'framer-motion'; // For animations
import ContactForm from '../components/contact/ContactForm'; // The contact form component
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'; // Icons
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Icons
import useDocumentTitle from '../hooks/useDocumentTitle'; // Custom hook for setting the document title

// An array of objects containing contact details to be displayed on the page.
const contactDetails = [
  {
    icon: <EnvelopeIcon className="h-6 w-6 text-blue-500" />,
    text: 'yeabsirad9@gmail.com',
    href: 'mailto:yeabsirad9@gmail.com',
  },
  {
    icon: <PhoneIcon className="h-6 w-6 text-blue-500" />,
    text: '+251918472342',
    href: 'tel:+251918472342',
  },
  {
    icon: <FaGithub className="h-6 w-6 text-blue-500" />,
    text: 'GitHub',
    href: 'https://github.com/yeabsiradaniel',
  },
  {
    icon: <FaLinkedin className="h-6 w-6 text-blue-500" />,
    text: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yeabsira-daniel-3368a5373',
  },
];

/**
 * The Contact page component.
 * Displays contact information and a form for users to send messages.
 */
const Contact = () => {
  // Set the document title for this page
  useDocumentTitle('Contact');

  return (
    // Main container with fade-in animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      {/* Page Title */}
      <h1 className="text-4xl font-serif font-bold text-center mb-8">Get In Touch</h1>
      
      {/* Contact Information Box */}
      <div className="max-w-xl mx-auto mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
        <h2 className="text-2xl font-serif font-bold text-center mb-6">Contact Information</h2>
        <div className="space-y-4">
          {/* Map through the contactDetails array to render each contact item */}
          {contactDetails.map((detail, index) => (
            <a
              key={index}
              href={detail.href}
              target="_blank" // Open link in a new tab
              rel="noopener noreferrer" // Security best practice for target="_blank"
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {detail.icon}
              <span className="font-sans text-gray-700 dark:text-gray-300 transition-colors duration-300">{detail.text}</span>
            </a>
          ))}
        </div>
      </div>

      {/* The Contact Form Component */}
      <ContactForm />
    </motion.div>
  );
};

// Export the Contact component
export default Contact;