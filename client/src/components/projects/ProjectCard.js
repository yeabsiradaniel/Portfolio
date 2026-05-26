import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const ProjectCard = ({ project, openModal, index }) => {
  const cardRef = useRef(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 16);
    rotateY.set(x * 16);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-container-${project._id}`}
      onClick={() => openModal(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transition-colors duration-800 ease-in-out"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileTap={{ scale: 0.98 }}
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