import React from 'react';
import { motion } from 'framer-motion';
import RevealText from '../common/RevealText';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '5+', label: 'Happy Clients' },
];

const AboutMe = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Profile image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent via-purple-500 to-pink-500 dark:from-accent dark:via-emerald-400 dark:to-cyan-400 opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500 animate-spin-slow" />
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800">
              <img
                src="/images/profile.jpg"
                alt="Yeabsira Daniel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm uppercase tracking-widest text-accent font-sans font-semibold mb-2">About Me</h2>
            <h3 className="font-heading font-bold mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
              <RevealText>Flutter Developer & Full-Stack Engineer</RevealText>
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-sans mb-8 max-w-xl transition-colors duration-300"
          >
            I build production apps that people actually use. Currently developing ShegerWalk, a gamified fitness app deploying to the Play Store. Previously led frontend at Gebeta Maps, a navigation platform serving delivery businesses in Addis Ababa. I've shipped mobile and web solutions for multiple clients, from expense trackers with SMS parsing to restaurant ordering systems.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center lg:justify-start gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + i * 0.1, type: 'spring', stiffness: 200 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-heading font-bold text-accent">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-sans mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
