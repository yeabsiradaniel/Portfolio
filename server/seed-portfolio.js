// One-off seed: add the portfolio site itself as a project, in the same
// shape the admin dashboard writes. Idempotent by title. Run: node seed-portfolio.js
require('dotenv').config();

// mongodb+srv URIs can fail to resolve via some local DNS setups (same
// workaround server.js uses).
require('dns').setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const Project = require('./models/Project');

const portfolioProject = {
  title: 'Developer Portfolio',
  description:
    'My personal portfolio — a MERN application with an interactive react-three-fiber hero (custom displacement shaders, click ripples, switchable material presets), dark/light theming that follows the OS preference, animated skills and timeline sections, a projects showcase served from MongoDB with an admin dashboard for CRUD, and a working contact form. Deployed on Netlify with a Node/Express API.',
  techStack: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Netlify'],
  liveLink: '',
  githubLink: 'https://github.com/yeabsiradaniel/Portfolio',
  imageUrl: '/images/portfolio-screenshot.png',
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    const existing = await Project.findOne({ title: portfolioProject.title });
    if (existing) {
      console.log(`Project "${portfolioProject.title}" already exists. No new data was added.`);
    } else {
      const created = await new Project(portfolioProject).save();
      console.log(`Added "${created.title}" (${created._id})`);
      console.log(`  githubLink: ${created.githubLink}`);
      console.log(`  imageUrl:   ${created.imageUrl}`);
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seed();
