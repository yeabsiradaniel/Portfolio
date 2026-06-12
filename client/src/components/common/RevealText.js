import React from 'react';
import { motion } from 'framer-motion';

// Masked word-by-word reveal: each word slides up out of an overflow-hidden
// wrapper when the element scrolls into view.
const RevealText = ({ children, className = '', delay = 0, once = true }) => {
  const words = String(children).split(' ');

  return (
    <span className={className} aria-label={String(children)}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: '-40px' }}
            transition={{
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + i * 0.06,
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default RevealText;
