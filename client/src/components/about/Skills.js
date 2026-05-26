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

const Skills = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">My Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: catIndex * 0.15 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-md text-left transition-colors duration-800 ease-in-out"
          >
            <h3 className="font-heading font-bold text-lg mb-4 text-accent">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: catIndex * 0.15 + skillIndex * 0.05 }}
                  className="px-3 py-1.5 text-sm font-sans font-medium rounded-full bg-accent/10 dark:bg-accent/20 text-gray-800 dark:text-gray-200 transition-colors duration-300"
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
