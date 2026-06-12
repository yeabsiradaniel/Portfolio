import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setSending(true);
    try {
      await axios.post('/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setSending(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl font-sans text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-5 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell me about your project..."
            className={`${inputClasses} resize-none`}
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={sending}
          className="w-full py-3.5 px-6 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-sm transition-all duration-300 glow-accent disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </form>

      {/* Status messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-center text-sm font-sans"
        >
          Message sent successfully! I'll get back to you soon.
        </motion.div>
      )}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-center text-sm font-sans"
        >
          Failed to send message. Please try again or email me directly.
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactForm;
