// Import the Mongoose library
const mongoose = require('mongoose');

// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
  // 'name' field: a required string for the sender's name
  name: {
    type: String,
    required: true
  },
  // 'email' field: a required string for the sender's email
  email: {
    type: String,
    required: true
  },
  // 'message' field: a required string for the content of the message
  message: {
    type: String,
    required: true
  },
  // 'createdAt' field: a date to record when the message was created,
  // defaults to the current date and time
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Create and export the Message model
// This model will interact with the 'messages' collection in the database.
module.exports = mongoose.model('Message', messageSchema);