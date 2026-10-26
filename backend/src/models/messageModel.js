const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/messages.json');

// Ensure data directory and file exist
function initStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

initStorage();

class MessageModel {
  static getAll() {
    try {
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

    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    return newMessage;
  }

  static getById(id) {
    const messages = this.getAll();
    return messages.find(m => m.id === id) || null;
  }
}

module.exports = MessageModel;
