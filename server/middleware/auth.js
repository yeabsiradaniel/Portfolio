// Import the jsonwebtoken library for token verification
const jwt = require('jsonwebtoken');

/**
 * Middleware for authenticating routes.
 * It checks for a valid JSON Web Token (JWT) in the request header.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the stack.
 */
module.exports = function (req, res, next) {
  // Get the token from the 'x-auth-token' header
  const token = req.header('x-auth-token');

  // Check if a token is not present
  if (!token) {
    // If no token is found, return a 401 Unauthorized response
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, the payload is decoded.
    // Attach the user information from the decoded payload to the request object.
    req.user = decoded.user;

    // Call the next middleware in the stack
    next();
  } catch (err) {
    // If the token is not valid (e.g., expired or malformed),
    // return a 401 Unauthorized response.
    res.status(401).json({ msg: 'Token is not valid' });
  }
};