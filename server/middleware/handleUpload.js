const util = require('util');
const upload = require('./upload'); // Your original upload middleware

const uploadMiddleware = util.promisify(upload);

const handleUpload = async (req, res, next) => {
  try {
    await uploadMiddleware(req, res);
    next();
  } catch (err) {
    console.error('Upload Error:', err);
    // Pass the error to the next middleware, which could be an Express error handler
    // You can customize the message and status code
    res.status(400).json({ msg: `File upload error: ${err.message}` });
  }
};

module.exports = handleUpload;
