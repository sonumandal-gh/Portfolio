/**
 * Input validation middleware for API requests
 */

function validateContactInput(req, res, next) {
  const { name, email, message, subject } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters long.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters long.');
  }

  if (subject && typeof subject === 'string' && subject.length > 200) {
    errors.push('Subject cannot exceed 200 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the errors and try again.',
      errors
    });
  }

  next();
}

module.exports = {
  validateContactInput
};
