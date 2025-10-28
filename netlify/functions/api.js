
// Load environment variables from .env file
require('dotenv').config();

// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const serverless = require('serverless-http');

// Import middleware
const auth = require('../../server/middleware/auth');
const handleUpload = require('../../server/middleware/handleUpload');

// Import models
const Project = require('../../server/models/Project');
const Message = require('../../server/models/Message');

// Initialize the Express application
const app = express();

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies
app.use(express.json());

// --- Database Connection ---

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// --- API Routes ---

const apiRouter = express.Router();

apiRouter.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Internal server error while fetching projects.' });
  }
});

apiRouter.post('/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    techStack: req.body.techStack,
    liveLink: req.body.liveLink,
    githubLink: req.body.githubLink,
    imageUrl: req.body.imageUrl,
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

apiRouter.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = new Message({ name, email, message });
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.use(apiRouter);

// --- Admin Routes ---

const adminRouter = express.Router();

adminRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: 'admin' } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

adminRouter.post('/projects', [auth, handleUpload], async (req, res) => {
    const { title, description, techStack, liveLink, githubLink } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    try {
        const newProject = new Project({
            title,
            description,
            techStack: techStack.split(',').map(item => item.trim()),
            liveLink,
            githubLink,
            imageUrl
        });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

adminRouter.put('/projects/:id', [auth, handleUpload], async (req, res) => {
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
        projectFields.imageUrl = req.file.path;
    } else if (imageUrl) {
        projectFields.imageUrl = imageUrl;
    }
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        project = await Project.findByIdAndUpdate(req.params.id, { $set: projectFields }, { new: true });
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

adminRouter.delete('/projects/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // The old file deletion logic is removed as files are now on Cloudinary.

        await Project.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err); // Log the full error object
        res.status(500).send('Server Error');
    }
});

app.use('/admin', adminRouter);

// Serve uploaded files statically
// app.use('/uploads', express.static('uploads'));

// --- Serve React App in Production ---

// app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });

module.exports.handler = serverless(app);
