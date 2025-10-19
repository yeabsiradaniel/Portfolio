// Force update for Render deployment
// Load environment variables from .env file
require('dotenv').config();

// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import route handlers
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

// Initialize the Express application
const app = express();

// Define the port for the server
const PORT = process.env.PORT || 5000;

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// This line specifically configures the body-parser to handle JSON data.
app.use(bodyParser.json());

// --- Database Connection ---

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected')) // Log success message on connection
  .catch(err => console.log(err)); // Log any errors during connection

// --- API Routes ---

// Mount the API routes under the /api path
app.use('/api', apiRoutes);

// Mount the admin routes under the /admin path
app.use('/admin', adminRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// --- Serve React App in Production ---

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});


// --- Server Startup ---

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});