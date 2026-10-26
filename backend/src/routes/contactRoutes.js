const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');
const { validateContactInput } = require('../middleware/validator');

// Submit message with validation middleware (also sends email notification)
router.post('/', validateContactInput, ContactController.submitMessage);

// Get messages for admin inbox
router.get('/messages', ContactController.getMessages);

// Email notification settings
router.get('/email-config', ContactController.getEmailConfig);
router.post('/email-config', ContactController.updateEmailConfig);

// Send test email
router.post('/test-email', ContactController.sendTestEmail);

module.exports = router;
