const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '../data/emailConfig.json');

class EmailService {
  /**
   * Retrieves email configuration from data file or environment variables
   */
  static getConfig() {
    let savedConfig = {};
    if (fs.existsSync(CONFIG_FILE)) {
      try {
        const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
        savedConfig = JSON.parse(raw || '{}');
      } catch (err) {
        console.error('Error reading emailConfig.json:', err.message);
      }
    }

    return {
      service: savedConfig.service || process.env.EMAIL_SERVICE || 'gmail',
      user: savedConfig.user || process.env.EMAIL_USER || 'sonu.bcastudent@gmail.com',
      pass: savedConfig.pass || process.env.EMAIL_PASS || '',
      notificationEmail: savedConfig.notificationEmail || process.env.NOTIFICATION_EMAIL || 'sonu.bcastudent@gmail.com',
      enabled: savedConfig.enabled !== undefined ? savedConfig.enabled : true
    };
  }

  /**
   * Saves updated email configuration to file
   */
  static saveConfig(newConfig) {
    const dir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const current = this.getConfig();
    const updated = {
      service: newConfig.service || current.service,
      user: newConfig.user !== undefined ? newConfig.user.trim() : current.user,
      pass: newConfig.pass !== undefined ? newConfig.pass.trim() : current.pass,
      notificationEmail: newConfig.notificationEmail !== undefined ? newConfig.notificationEmail.trim() : current.notificationEmail,
      enabled: newConfig.enabled !== undefined ? Boolean(newConfig.enabled) : current.enabled
    };

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  }

  /**
   * Creates a Nodemailer transporter using current configuration
   */
  static createTransporter(config) {
    const cfg = config || this.getConfig();

    if (!cfg.user || !cfg.pass) {
      return null;
    }

    return nodemailer.createTransport({
      service: cfg.service || 'gmail',
      auth: {
        user: cfg.user,
        pass: cfg.pass
      }
    });
  }

  /**
   * Sends contact form notification email to Sonu
   */
  static async sendContactNotification({ name, email, subject, message, ip, createdAt }) {
    const config = this.getConfig();

    if (!config.enabled) {
      console.log('ℹ️ [EmailService] Email notification is disabled.');
      return { success: false, reason: 'disabled' };
    }

    if (!config.pass) {
      console.warn('⚠️ [EmailService] EMAIL_PASS is not configured. Message stored in DB only.');
      return {
        success: false,
        reason: 'unconfigured',
        note: 'Add your 16-character Gmail App Password to backend/.env or CMS Settings to enable instant email delivery.'
      };
    }

    const transporter = this.createTransporter(config);
    if (!transporter) {
      return { success: false, reason: 'transporter_failed' };
    }

    const toEmail = config.notificationEmail || config.user;
    const formattedDate = new Date(createdAt || Date.now()).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 24px; color: #f8fafc; }
    .card { max-width: 620px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); padding: 24px 28px; text-align: left; }
    .header h2 { margin: 0; font-size: 20px; color: #ffffff; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.85); }
    .content { padding: 28px; }
    .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .field-item { background: #1f2937; padding: 12px 16px; border-radius: 8px; border: 1px solid #374151; }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px; font-weight: 600; }
    .field-value { font-size: 14px; color: #f1f5f9; font-weight: 500; word-break: break-word; }
    .field-value a { color: #38bdf8; text-decoration: none; }
    .message-box { background: #0f172a; border-left: 4px solid #38bdf8; border-radius: 6px; padding: 18px 20px; margin: 20px 0; }
    .message-text { font-size: 14.5px; line-height: 1.65; color: #e2e8f0; white-space: pre-wrap; margin: 0; }
    .actions { text-align: center; margin-top: 24px; }
    .reply-btn { display: inline-block; background: #0284c7; color: #ffffff !important; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; box-shadow: 0 4px 14px rgba(2,132,199,0.4); }
    .footer { padding: 16px 28px; background: #0b0f19; border-top: 1px solid #1f2937; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>📬 New Message from Portfolio Website</h2>
      <p>Someone reached out through your online portfolio contact form</p>
    </div>

    <div class="content">
      <div class="field-grid">
        <div class="field-item">
          <div class="field-label">Sender Name</div>
          <div class="field-value">${name}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Sender Email</div>
          <div class="field-value"><a href="mailto:${email}">${email}</a></div>
        </div>
      </div>

      <div class="field-item" style="margin-bottom: 20px;">
        <div class="field-label">Subject</div>
        <div class="field-value" style="color: #38bdf8;">${subject || 'General Portfolio Inquiry'}</div>
      </div>

      <div class="field-label" style="margin-bottom: 8px;">Message Content:</div>
      <div class="message-box">
        <p class="message-text">${message}</p>
      </div>

      <div class="field-grid" style="margin-top: 20px;">
        <div class="field-item">
          <div class="field-label">Received At</div>
          <div class="field-value" style="font-size: 12px;">${formattedDate}</div>
        </div>
        <div class="field-item">
          <div class="field-label">Sender IP</div>
          <div class="field-value" style="font-size: 12px; color: #94a3b8;">${ip}</div>
        </div>
      </div>

      <div class="actions">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" class="reply-btn">
          ✉️ Direct Reply to ${name}
        </a>
      </div>
    </div>

    <div class="footer">
      Sent automatically by Sonu Mandal Portfolio Backend • Delivered to ${toEmail}
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
      from: `"Sonu Portfolio Contact" <${config.user}>`,
      to: toEmail,
      replyTo: `${name} <${email}>`,
      subject: `📬 [Portfolio Inquiry] ${subject || 'New Message'} from ${name}`,
      text: `New Portfolio Message\n\nFrom: ${name} (${email})\nSubject: ${subject || 'General Inquiry'}\nTime: ${formattedDate}\nIP: ${ip}\n\nMessage:\n${message}\n\nReply directly to: ${email}`,
      html: htmlContent
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ [EmailService] Notification successfully sent to ${toEmail} (ID: ${info.messageId})`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('❌ [EmailService] Error sending email via SMTP:', err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * Sends a test email to verify SMTP credentials
   */
  static async sendTestEmail(targetEmail) {
    const config = this.getConfig();
    const recipient = targetEmail || config.notificationEmail || config.user;

    if (!config.pass) {
      throw new Error('EMAIL_PASS (Gmail App Password) is not configured. Please set your 16-character Google App Password first.');
    }

    const transporter = this.createTransporter(config);
    if (!transporter) {
      throw new Error('Failed to create mail transporter with provided credentials.');
    }

    const mailOptions = {
      from: `"Sonu Portfolio Server" <${config.user}>`,
      to: recipient,
      subject: '✅ Sonu Mandal Portfolio — Email Notifications Test Successful!',
      html: `
        <div style="font-family:sans-serif; background:#0b0f19; color:#f8fafc; padding:24px; border-radius:12px; max-width:550px; margin:auto; border:1px solid #1e293b;">
          <h2 style="color:#38bdf8; margin-top:0;">🎉 Email Notification Working!</h2>
          <p>Hi Sonu,</p>
          <p>Your portfolio email notification system is configured correctly. From now on, whenever a visitor sends a message from your website contact form, you will receive an instant email notification here.</p>
          <div style="background:#1e293b; padding:12px 16px; border-radius:8px; font-size:13px; color:#cbd5e1; margin:16px 0;">
            <strong>Configured Recipient:</strong> ${recipient}<br>
            <strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </div>
          <p style="font-size:12px; color:#64748b;">Sonu Mandal Portfolio Backend Server</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId, recipient };
  }
}

module.exports = EmailService;
