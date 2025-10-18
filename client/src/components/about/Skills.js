import React from 'react';
import { motion } from 'framer-motion'; // For animations

// An array of skill objects, each with a name and a proficiency level (out of 100).
const skills = [
  { name: 'Flutter', level: 90 },
  { name: 'Automation (Python + Gemini, etc.)', level: 88 },
  { name: 'Python (for automation)', level: 85 },
  { name: 'Git & GitHub', level: 85 },
  { name: 'React.js', level: 82 },
  { name: 'REST API Development', level: 80 },
  { name: 'Node.js', level: 78 },
  { name: 'Express.js', level: 77 },
  { name: 'Cloudinary & Multer', level: 75 },
  { name: 'MongoDB', level: 75 },
  { name: 'Firebase (Auth, Realtime DB)', level: 70 },
  { name: 'HTML/CSS/JS', level: 75 },
];

/**
 * The Skills component.
 * Displays a list of skills with animated progress bars.
 */
const Skills = () => {
  return (
    <div className="text-center">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">My Skills</h2>
      
      {/* Grid container for the skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
        {/* Map through the skills array to render each skill */}
        {skills.map((skill, index) => (
          <div key={index} className="mb-4">
            {/* Skill name and percentage level */}
            <div className="flex justify-between mb-2">
              <span className="font-sans font-medium text-xl">{skill.name}</span>
              <span className="text-sm font-sans font-medium text-blue-500">{skill.level}%</span>
            </div>
            
            {/* Background of the progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden transition-colors duration-800 ease-in-out">
              {/* Animated foreground of the progress bar */}
              <motion.div
                className="bg-blue-500 h-4 rounded-full shadow-md"
                initial={{ width: 0 }} // Starts with a width of 0
                whileInView={{ width: `${skill.level}%` }} // Animates to the skill's level percentage when in view
                viewport={{  amount: 0.8 }} // Animation triggers once when 80% of the element is visible
                transition={{ duration: 1, delay: 0.1 * index, ease: 'easeOut' }} // Staggered animation delay for each bar
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Skills component
export default Skills;