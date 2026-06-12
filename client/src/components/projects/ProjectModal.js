import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectModal = ({ project, closeModal }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleBackgroundClick}
      >
        <motion.div
          layoutId={`card-container-${project._id}`}
          className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300 border border-gray-200/20 dark:border-gray-700/20"
        >
          {/* Image with close button */}
          <div className="relative">
            <motion.img
              layoutId={`image-${project._id}`}
              src={project.imageUrl || 'https://via.placeholder.com/400x250'}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors duration-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <motion.h2
              layoutId={`title-${project._id}`}
              className="text-2xl sm:text-3xl font-heading font-bold mb-3"
            >
              {project.title}
            </motion.h2>

            <motion.p
              layoutId={`description-${project._id}`}
              className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed mb-6 transition-colors duration-300"
            >
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-widest text-accent font-sans font-semibold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs font-sans font-medium rounded-lg bg-accent/10 dark:bg-accent/15 text-accent border border-accent/20 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-sans font-medium text-sm transition-colors duration-200"
                >
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 hover:border-accent hover:text-accent rounded-xl font-sans font-medium text-sm transition-all duration-200"
                >
                  <FaGithub className="h-4 w-4" />
                  Source Code
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
