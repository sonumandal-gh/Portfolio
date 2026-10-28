const fs = require('fs');
const path = require('path');

const SEED_DATA_FILE = path.join(__dirname, '../data/messages.json');
const DATA_FILE = process.env.VERCEL ? path.join('/tmp', 'messages.json') : SEED_DATA_FILE;

// Ensure data directory and file exist
function initStorage() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      let initialData = '[]';
      if (fs.existsSync(SEED_DATA_FILE)) {
        try {
          initialData = fs.readFileSync(SEED_DATA_FILE, 'utf-8');
        } catch (e) {}
      }
      fs.writeFileSync(DATA_FILE, initialData || '[]', 'utf-8');
    }
  } catch (err) {
    console.warn('initStorage notice:', err.message);
  }
}

initStorage();

class MessageModel {
  static getAll() {
    try {
      if (!fs.existsSync(DATA_FILE) && fs.existsSync(SEED_DATA_FILE)) {
        const seed = fs.readFileSync(SEED_DATA_FILE, 'utf-8');
        return JSON.parse(seed || '[]');
      }
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data || '[]');
    } catch (err) {
      console.error('Error reading messages file:', err);
      return [];
    }
  }

  static create({ name, email, subject, message, ip = 'anonymous' }) {
    const messages = this.getAll();
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'Portfolio Contact Submission',
      message: message.trim(),
      ip,
      read: false,
      createdAt: new Date().toISOString()
    };

    messages.unshift(newMessage);

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    } catch (writeErr) {
      console.warn('Could not persist message to local file (serverless environment):', writeErr.message);
    }
    return newMessage;
  }

  static getById(id) {
    const messages = this.getAll();
    return messages.find(m => m.id === id) || null;
  }
}

module.exports = MessageModel;
