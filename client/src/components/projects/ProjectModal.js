import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For animations

/**
 * The ProjectModal component.
 * Displays the full details of a selected project in a modal overlay.
 * Uses Framer Motion's shared layout animations for a smooth transition from the card.
 *
 * @param {object} project - The project data to display in the modal.
 * @param {function} closeModal - The function to call to close the modal.
 */
const ProjectModal = ({ project, closeModal }) => {

  /**
   * Handles clicks on the modal's background overlay.
   * Closes the modal only if the click is on the overlay itself, not on its children (the modal content).
   * @param {object} e - The click event object.
   */
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    // AnimatePresence handles the enter and exit animations of the modal.
    <AnimatePresence>
      {/* The modal overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackgroundClick}
      >
        {/* The modal content container. The `layoutId` matches the one on the ProjectCard. */}
        <motion.div
          layoutId={`card-container-${project._id}`}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl max-w-3xl w-full transition-colors duration-300"
        >
          {/* Project Image */}
          <motion.img
            layoutId={`image-${project._id}`} // Shared layout ID
            src={project.imageUrl || 'https://via.placeholder.com/400x250'}
            alt={project.title}
            className="w-full h-80 object-cover"
          />
          {/* Modal Text Content */}
          <div className="p-8">
            {/* Project Title */}
            <motion.h2
              layoutId={`title-${project._id}`} // Shared layout ID
              className="text-3xl font-bold mb-4"
            >
              {project.title}
            </motion.h2>
            {/* Full Project Description */}
            <motion.p
              layoutId={`description-${project._id}`} // Shared layout ID
              className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300"
            >
              {project.description}
            </motion.p>
            {/* Tech Stack Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Links Section (Live Demo, GitHub) */}
            <div className="flex justify-end gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Stop propagation to prevent the modal from closing when a link is clicked
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-500 hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;