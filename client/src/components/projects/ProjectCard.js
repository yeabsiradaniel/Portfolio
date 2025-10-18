import React from 'react';
import { motion } from 'framer-motion'; // For animations

/**
 * The ProjectCard component.
 * Displays a single project in a card format with an image, title, and description.
 * Clicking the card opens a detailed modal.
 *
 * @param {object} project - The project data to display.
 * @param {function} openModal - The function to call when the card is clicked.
 * @param {number} index - The index of the card in the grid, used for staggered animations.
 */
const ProjectCard = ({ project, openModal, index }) => {
  return (
    // The main card container, animated with Framer Motion.
    <motion.div
      // `layoutId` is crucial for the shared layout animation between the card and the modal.
      layoutId={`card-container-${project._id}`}
      onClick={() => openModal(project)}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-1 transition-colors duration-800 ease-in-out"
      // Animation properties
      initial={{ opacity: 0, y: 50 }} // Initial state
      whileInView={{ opacity: 1, y: 0 }} // Animate when in view
      viewport={{ once: true, amount: 0.5 }} // Trigger animation once
      transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered delay
      whileHover={{ scale: 1.02 }} // Scale up on hover
      whileTap={{ scale: 0.98 }} // Scale down on click/tap
    >
      {/* Project Image */}
      <motion.img
        layoutId={`image-${project._id}`} // Shared layout ID for the image
        src={project.imageUrl || 'https://via.placeholder.com/400x250'} // Use project image or a placeholder
        alt={project.title}
        className="w-full h-64 object-cover"
      />
      {/* Card Content */}
      <div className="p-8">
        {/* Project Title */}
        <motion.h2
          layoutId={`title-${project._id}`} // Shared layout ID for the title
          className="text-3xl font-bold mb-3"
        >
          {project.title}
        </motion.h2>
        {/* Project Description (truncated) */}
        <motion.p
          layoutId={`description-${project._id}`} // Shared layout ID for the description
          className="text-gray-600 dark:text-gray-400 text-lg"
        >
          {project.description.substring(0, 120)}...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;