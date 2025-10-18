// Import necessary packages and models
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Message = require('../models/Message');

// --- Project Routes ---

/**
 * @route   GET /api/projects
 * @desc    Get all projects from the database
 * @access  Public
 */
router.get('/projects', async (req, res) => {
  try {
    // Fetch all documents from the Project collection
    const projects = await Project.find();
    // Send the projects as a JSON response
    console.log('Fetched projects:', projects);
    res.json(projects);
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error fetching projects:', err);
    // Send a 500 Internal Server Error response if something goes wrong
    res.status(500).json({ message: 'Internal server error while fetching projects.' });
  }
});

/**
 * @route   POST /api/projects
 * @desc    Add a new project to the database
 * @access  Public (Note: Should ideally be a protected route)
 */
router.post('/projects', async (req, res) => {
  // Create a new Project instance with data from the request body
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    techStack: req.body.techStack,
    liveLink: req.body.liveLink,
    githubLink: req.body.githubLink,
    imageUrl: req.body.imageUrl,
  });

  try {
    // Save the new project to the database
    const newProject = await project.save();
    // Send the newly created project as a JSON response with a 201 Created status
    res.status(201).json(newProject);
  } catch (err) {
    // If validation fails or another error occurs, send a 400 Bad Request response
    res.status(400).json({ message: err.message });
  }
});

// --- Contact Route ---

/**
 * @route   POST /api/contact
 * @desc    Submit a contact form message
 * @access  Public
 */
router.post('/contact', async (req, res) => {
  // Destructure name, email, and message from the request body
  const { name, email, message } = req.body;

  // Create a new Message instance
  const newMessage = new Message({
    name,
    email,
    message,
  });

  try {
    // Save the new message to the database
    const savedMessage = await newMessage.save();
    // Send the saved message as a JSON response with a 201 Created status
    res.status(201).json(savedMessage);
  } catch (err) {
    // If an error occurs, send a 400 Bad Request response
    res.status(400).json({ message: err.message });
  }
});

// Export the router to be used in the main server file
module.exports = router;