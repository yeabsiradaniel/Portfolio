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
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
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
      className="cursor-pointer rounded-2xl overflow-hidden glass-card group"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image with overlay */}
      <div className="relative overflow-hidden">
        <motion.img
          layoutId={`image-${project._id}`}
          src={project.imageUrl || 'https://via.placeholder.com/400x250'}
          alt={project.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tech stack preview on hover */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="px-2 py-0.5 text-xs font-sans font-medium rounded-md bg-white/20 backdrop-blur-sm text-white border border-white/10">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-sans font-medium rounded-md bg-white/20 backdrop-blur-sm text-white border border-white/10">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-6">
        <motion.h2
          layoutId={`title-${project._id}`}
          className="text-xl font-heading font-bold mb-2 group-hover:text-accent transition-colors duration-300"
        >
          {project.title}
        </motion.h2>
        <motion.p
          layoutId={`description-${project._id}`}
          className="text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed line-clamp-2"
        >
          {project.description.substring(0, 120)}...
        </motion.p>

        {/* View details hint */}
        <div className="mt-4 flex items-center text-accent text-sm font-sans font-medium opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
          <span>View Details</span>
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
