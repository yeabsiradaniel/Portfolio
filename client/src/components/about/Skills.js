import React from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaServer, FaTools } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'Mobile Development',
    icon: FaMobileAlt,
    color: 'from-blue-500 to-purple-600',
    darkColor: 'dark:from-teal-400 dark:to-emerald-500',
    skills: [
      'Flutter & Dart',
      'BLoC / Cubit',
      'Dio HTTP Client',
      'Hive Local Storage',
      'Firebase (Auth, FCM, Crashlytics)',
      'Platform Channels',
      'Play Store Deployment',
    ],
  },
  {
    title: 'Web & Backend',
    icon: FaServer,
    color: 'from-purple-500 to-pink-600',
    darkColor: 'dark:from-emerald-400 dark:to-cyan-500',
    skills: [
      'React.js',
      'Node.js & Express',
      'Django & DRF',
      'FastAPI & Python',
      'MongoDB & PostgreSQL',
      'REST API Design',
      'JWT Authentication',
      'WebSockets',
      'Tailwind CSS',
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: FaTools,
    color: 'from-pink-500 to-orange-500',
    darkColor: 'dark:from-cyan-400 dark:to-teal-500',
    skills: [
      'Git & GitHub',
      'CI/CD (GitHub Actions)',
      'AWS Lightsail',
      'Docker',
      'Nginx & Gunicorn',
      'Cloudinary',
      'Netlify / Vercel',
      'Postman / API Testing',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: 'easeOut',
    },
  }),
};

const tagVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 18,
      delay: i * 0.04,
    },
  }),
};

const Skills = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm uppercase tracking-widest text-accent font-sans font-semibold mb-2">What I Work With</h2>
        <h3 className="text-3xl md:text-4xl font-heading font-bold mb-12">My Skills</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {skillCategories.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              custom={catIndex}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative group glass-card rounded-2xl p-6 text-left cursor-default overflow-hidden"
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} ${category.darkColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} ${category.darkColor} mb-4`}>
                <Icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="font-heading font-bold text-lg mb-4">{category.title}</h3>

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
                      scale: 1.08,
                      transition: { duration: 0.15 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 text-xs font-sans font-medium rounded-lg bg-white/50 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-white/5 hover:border-accent/30 hover:bg-accent/10 transition-all duration-200 cursor-default select-none"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
