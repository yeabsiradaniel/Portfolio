import React from 'react';
import { motion } from 'framer-motion';

// Masked word-by-word reveal: each word slides up out of an overflow-hidden
// wrapper when the element scrolls into view.
//
// whileInView lives on the OUTER wrapper, not the animated word: the word's
// initial y:110% transform moves it entirely outside the wrapper's clip, so
// IntersectionObserver reports zero intersection for it and the trigger never
// fires (deadlock). The wrapper itself is untransformed and intersects
// normally; the word follows via variant propagation.
const RevealText = ({ children, className = '', delay = 0, once = true }) => {
  const words = String(children).split(' ');

  return (
    <span className={className} aria-label={String(children)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: 0 },
            }}
            transition={{
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + i * 0.06,
            }}
          >
            {word}
            {/* a trailing ASCII space collapses inside inline-block; nbsp doesn't */}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
};

export default RevealText;
