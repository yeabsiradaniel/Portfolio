// Load environment variables from .env file
require('dotenv').config();

// Import Mongoose and the Project model
const mongoose = require('mongoose');
const Project = require('./models/Project');

/**
 * This script seeds the database with initial project data.
 * It connects to MongoDB, checks if projects already exist, and adds them if they don't.
 * This is useful for setting up a new development environment with sample data.
 *
 * To run this script, use the command: `node seed.js`
 */

// --- Seed Data ---
// An array of project objects to be inserted into the database.
const projects = [
  {
    title: "Gara Bike – Smart Bike Sharing App",
    description: "A cross-platform bike-sharing app built with Flutter and React, featuring real-time bike tracking (OpenStreetMap), user authentication, subscriptions, and a custom React admin dashboard. Designed for scalability and future payment integration.",
    techStack: ["Flutter", "React", "Node.js", "Firebase", "OpenStreetMap"],
    liveLink: "",
    githubLink: "https://github.com/yourusername/gara-bike",
    imageUrl: "https://example.com/gara-bike-screenshot.png",
  },
  {
    title: "MERN E-commerce Platform",
    description: "A full-featured e-commerce site with secure authentication, product management, cart, and checkout functionality. Developed to simulate real-world online shopping experiences with clean code and scalable architecture.",
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Redux", "Tailwind CSS"],
    liveLink: "",
    githubLink: "https://github.com/yourusername/mern-ecommerce",
    imageUrl: "https://example.com/mern-ecommerce-screenshot.png",
  },
  {
    title: "Gebeta Maps – React Frontend",
    description: "Contributed to the frontend of Gebeta Maps, a real-time mapping platform, by developing modular React components and improving UI/UX flow. Worked collaboratively with a live production team.",
    techStack: ["React", "Tailwind CSS", "Map APIs"],
    liveLink: "https://gebeta.app",
    githubLink: "",
    imageUrl: "/images/gebeta-maps-screenshot.png",
  }
];

// --- Seeding Function ---
const seedDatabase = async () => {
  try {
    // Connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected for seeding');

    // Iterate over the projects array
    for (const projectData of projects) {
      // Check if a project with the same title already exists in the database
      const existingProject = await Project.findOne({ title: projectData.title });

      if (existingProject) {
        // If the project exists, log a message and do nothing
        console.log(`Project "${projectData.title}" already exists. No new data was added.`);
      } else {
        // If the project does not exist, create a new Project instance
        const newProject = new Project(projectData);
        // Save the new project to the database
        await newProject.save();
        console.log(`Project "${projectData.title}" has been added successfully.`);
      }
    }

  } catch (error) {
    // Log any errors that occur during the seeding process
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from the database once the script is finished, whether it succeeded or failed
    mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

// --- Execute Script ---
// Call the function to start the seeding process
seedDatabase();