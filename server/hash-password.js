// Import the bcryptjs library for password hashing
const bcrypt = require('bcryptjs');

/**
 * This script generates a salted hash for a given password.
 * It's intended to be run from the command line to create a secure password hash
 * that can be stored in environment variables or a database.
 *
 * Usage:
 * 1. Set the desired password in the 'password' variable below.
 * 2. Run the script from your terminal: `node hash-password.js`
 * 3. The script will output the generated hash to the console.
 * 4. Copy this hash and use it as the value for ADMIN_PASSWORD_HASH in your .env file.
 */

// --- Configuration ---
// Hardcode the password directly in the script.
// This is a simple approach for a one-off script.
const password = 'Hate2love'; // IMPORTANT: Change this to your desired password

// --- Script Logic ---

// Validate that a password has been provided
if (!password) {
  console.error('Error: No password provided in the script.');
  console.error('Please edit the file and set the "password" variable.');
  process.exit(1); // Exit with an error code
}

// Generate a salt. A salt is random data that is used as an additional
// input to a one-way function that "hashes" a password.
// The 10 is the "cost factor" - higher is more secure but slower. 10 is a good default.
const salt = bcrypt.genSaltSync(10);

// Hash the password using the generated salt
const hashedPassword = bcrypt.hashSync(password, salt);

// --- Output ---

// Log the final hashed password to the console
console.log('Generated Hashed Password:', hashedPassword);