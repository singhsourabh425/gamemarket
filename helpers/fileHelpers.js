const multer = require('multer');

// Set up multer to handle form data
const upload = multer();

// Middleware to handle form data
const handleFormData = upload.fields([]);

module.exports = handleFormData;