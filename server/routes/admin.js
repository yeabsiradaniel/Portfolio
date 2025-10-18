// Import necessary packages and models
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Authentication middleware
const handleUpload = require('../middleware/handleUpload');
const Project = require('../models/Project');

// --- Admin Authentication ---

/**
 * @route   POST /admin/login
 * @desc    Authenticate admin user and return a JWT token.
 * @access  Public
 */
router.post('/login', async (req, res) => {
  // Destructure username and password from the request body
  const { username, password } = req.body;

  try {
    // Check if the provided username matches the one stored in environment variables
    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password from environment variables
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    // If passwords do not match, return an error
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a payload for the JWT
    const payload = {
      user: {
        id: 'admin' // Simple identifier for the admin user
      }
    };

    // Sign the JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: 3600 }, // Token expires in 1 hour (3600 seconds)
      (err, token) => {
        if (err) throw err;
        // Send the generated token back to the client
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- CRUD Operations for Projects (Protected by Auth Middleware) ---

/**
 * @route   POST /admin/projects
 * @desc    Create a new project with an image upload.
 * @access  Private (Requires a valid token)
 */
router.post('/projects', [auth, handleUpload], async (req, res) => {
    // Destructure project data from the request body
    const { title, description, techStack, liveLink, githubLink } = req.body;
    
    // Set the imageUrl to the path of the uploaded file
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        // Create a new Project instance
        const newProject = new Project({
            title,
            description,
            techStack: techStack.split(',').map(item => item.trim()), // Convert comma-separated string to array
            liveLink,
            githubLink,
            imageUrl
        });

        // Save the new project to the database
        const project = await newProject.save();
        // Return the newly created project
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   PUT /admin/projects/:id
 * @desc    Update an existing project by its ID, with optional image upload.
 * @access  Private (Requires a valid token)
 */
router.put('/projects/:id', [auth, handleUpload], async (req, res) => {
    const { title, description, techStack, liveLink, githubLink, imageUrl } = req.body;

    const projectFields = {};
    if (title) projectFields.title = title;
    if (description) projectFields.description = description;
    if (typeof techStack === 'string') {
        projectFields.techStack = techStack.split(',').map(item => item.trim());
    } else if (Array.isArray(techStack)) {
        projectFields.techStack = techStack;
    }
    if (liveLink) projectFields.liveLink = liveLink;
    if (githubLink) projectFields.githubLink = githubLink;
    if (req.file) {
        projectFields.imageUrl = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
        projectFields.imageUrl = imageUrl;
    }

    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: projectFields },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   DELETE /admin/projects/:id
 * @desc    Delete a project by its ID.
 * @access  Private (Requires a valid token)
 */
router.delete('/projects/:id', auth, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Here you might want to delete the associated image file from the server as well
        // fs.unlinkSync(path.join(__dirname, '..', project.imageUrl));

        await Project.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Export the router
module.exports = router;
