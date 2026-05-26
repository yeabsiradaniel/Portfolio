import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Mobile Development',
    skills: [
      'Flutter & Dart',
      'BLoC / Cubit State Management',
      'Dio HTTP Client',
      'Hive Local Storage',
      'Firebase (Auth, FCM, Crashlytics)',
      'Platform Channels',
      'Play Store Deployment',
    ],
  },
  {
    title: 'Web & Backend Development',
    skills: [
      'React.js',
      'Node.js & Express.js',
      'Django & Python',
      'MongoDB & Mongoose',
      'PostgreSQL',
      'REST API Design',
      'JWT Authentication',
      'Tailwind CSS',
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      'Git & GitHub',
      'CI/CD (GitHub Actions)',
      'Cloudinary (Media Management)',
      'Netlify / Vercel Deployment',
      'Postman / API Testing',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.2,
      ease: 'easeOut',
    },
  }),
};

const tagVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.7 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
      delay: i * 0.06,
    },
  }),
};

const Skills = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">My Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            custom={catIndex}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-md text-left transition-colors duration-800 ease-in-out cursor-default"
          >
            <h3 className="font-heading font-bold text-lg mb-4 text-accent">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  custom={skillIndex}
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(var(--color-accent), 0.25)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm font-sans font-medium rounded-full bg-accent/10 dark:bg-accent/20 text-gray-800 dark:text-gray-200 transition-colors duration-300 cursor-default select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
