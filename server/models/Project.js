// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Project model
const projectSchema = new mongoose.Schema({
  // 'title' field: a required string for the project's title
  title: {
    type: String,
    required: true
  },
  // 'description' field: a required string for the project's description
  description: {
    type: String,
    required: true
  },
  // 'techStack' field: an array of strings to list the technologies used
  techStack: [{
    type: String
  }],
  // 'liveLink' field: a string for the URL to the live project
  liveLink: {
    type: String
  },
  // 'githubLink' field: a string for the URL to the project's GitHub repository
  githubLink: {
    type: String
  },
  // 'imageUrl' field: a string for the URL of the project's image
  imageUrl: {
    type: String
  },
});

// Create and export the Project model
// The first argument 'Project' is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for the model 'Project', the collection will be 'projects'.
module.exports = mongoose.model('Project', projectSchema);