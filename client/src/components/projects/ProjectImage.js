import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Project image with a local, authored fallback: when imageUrl is missing or
 * fails to load, render an accent-tinted panel with the project's initial
 * instead of hotlinking an external placeholder service.
 */
const ProjectImage = ({ src, alt, className = '', layoutId }) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <motion.img
        layoutId={layoutId}
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={className}
      />
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      role="img"
      aria-label={alt}
      className={`${className} flex items-center justify-center bg-gradient-to-br from-accent/30 via-accent/10 to-transparent`}
    >
      <span className="font-heading font-bold text-5xl text-accent/60 select-none" aria-hidden="true">
        {(alt || '?').charAt(0)}
      </span>
    </motion.div>
  );
};

export default ProjectImage;
