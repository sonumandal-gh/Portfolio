const MessageModel = require('../models/messageModel');
const EmailService = require('../services/emailService');

class ContactController {
  // POST /api/contact
  static async submitMessage(req, res) {
    try {
      const { name, email, subject, message } = req.body;
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

      // 1. Persist to messages store
      const savedMessage = MessageModel.create({
        name,
        email,
        subject,
        message,
        ip
      });

      // 2. Dispatch email notification to Sonu's email
      let emailResult = { success: false, reason: 'pending' };
      try {
        emailResult = await EmailService.sendContactNotification({
          name,
          email,
          subject,
          message,
          ip,
          createdAt: savedMessage.createdAt
        });
      } catch (mailErr) {
        console.error('Email dispatch error:', mailErr.message);
      }

      res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received successfully. Sonu will get back to you shortly.',
        data: {
          id: savedMessage.id,
          name: savedMessage.name,
          email: savedMessage.email,
          createdAt: savedMessage.createdAt,
          emailDelivered: Boolean(emailResult.success)
        }
      });
    } catch (error) {
      console.error('Error submitting message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process message. Please try again later or email directly at sonu.bcastudent@gmail.com'
      });
    }
  }

  // GET /api/contact/messages
  static getMessages(req, res) {
    try {
      const messages = MessageModel.getAll();
      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve messages'
      });
    }
  }

  // GET /api/contact/email-config
  static getEmailConfig(req, res) {
    try {
      const config = EmailService.getConfig();
      res.status(200).json({
        success: true,
        data: {
          service: config.service,
          user: config.user,
          notificationEmail: config.notificationEmail,
          isConfigured: Boolean(config.pass),
          enabled: config.enabled
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to read email config' });
    }
  }

  // POST /api/contact/email-config
  static updateEmailConfig(req, res) {
    try {
      const { user, pass, notificationEmail, enabled } = req.body;
      const updated = EmailService.saveConfig({ user, pass, notificationEmail, enabled });
      res.status(200).json({
        success: true,
        message: 'Email notification settings updated successfully!',
        data: {
          service: updated.service,
          user: updated.user,
          notificationEmail: updated.notificationEmail,
          isConfigured: Boolean(updated.pass),
          enabled: updated.enabled
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to update email config: ' + err.message });
    }
  }

  // POST /api/contact/test-email
  static async sendTestEmail(req, res) {
    try {
      const { targetEmail } = req.body || {};
      const result = await EmailService.sendTestEmail(targetEmail);
      res.status(200).json({
        success: true,
        message: `Test email sent successfully to ${result.recipient}!`,
        data: result
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = ContactController;
