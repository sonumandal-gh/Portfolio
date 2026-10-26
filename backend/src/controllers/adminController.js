const fs = require('fs');
const path = require('path');
const PortfolioModel = require('../models/portfolioModel');
const MessageModel = require('../models/messageModel');
const INITIAL_DATA = require('../config/constants');

class AdminController {
  static getCredentials() {
    return {
      username: (process.env.ADMIN_USERNAME || 'sonumandal').trim(),
      password: (process.env.ADMIN_PASSWORD || 'Sonu#8252').trim()
    };
  }

  // POST /api/admin/login
  static login(req, res) {
    const { username, password } = req.body;
    const creds = AdminController.getCredentials();

    if (username && password && username.trim() === creds.username && password.trim() === creds.password) {
      // Return a simple session auth token
      const token = 'auth_token_' + Buffer.from(`${username}:${Date.now()}`).toString('base64');
      return res.status(200).json({
        success: true,
        message: 'Admin authenticated successfully',
        token,
        user: { username: creds.username }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }

  // GET /api/admin/data
  static getFullData(req, res) {
    const data = PortfolioModel.get();
    const messages = MessageModel.getAll();

    res.status(200).json({
      success: true,
      data: {
        ...data,
        messages
      }
    });
  }

  // PUT /api/admin/data
  static updateFullData(req, res) {
    try {
      const updated = PortfolioModel.updateAll(req.body);
      res.status(200).json({
        success: true,
        message: 'Portfolio data updated successfully!',
        data: updated
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to update portfolio data',
        error: err.message
      });
    }
  }

  // POST /api/admin/project
  static addProject(req, res) {
    try {
      const project = req.body;
      if (!project.title) {
        return res.status(400).json({ success: false, message: 'Project title is required' });
      }

      const added = PortfolioModel.addProject(project);
      res.status(201).json({
        success: true,
        message: 'Project added successfully!',
        data: added
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to add project' });
    }
  }

  // DELETE /api/admin/project/:id
  static deleteProject(req, res) {
    try {
      const { id } = req.params;
      const projects = PortfolioModel.deleteProject(id);
      res.status(200).json({
        success: true,
        message: 'Project deleted successfully!',
        data: projects
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to delete project' });
    }
  }

  // POST /api/admin/reset
  static resetToDefault(req, res) {
    try {
      PortfolioModel.save(INITIAL_DATA);
      res.status(200).json({
        success: true,
        message: 'Portfolio reset to resume defaults successfully!',
        data: INITIAL_DATA
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to reset portfolio' });
    }
  }

  // POST /api/admin/resume-upload
  static uploadResume(req, res) {
    try {
      const { fileName, fileData } = req.body;
      if (!fileName || !fileData) {
        return res.status(400).json({ success: false, message: 'File name and file content are required.' });
      }

      const base64Content = fileData.includes('base64,') ? fileData.split('base64,')[1] : fileData;
      const fileBuffer = Buffer.from(base64Content, 'base64');

      const ext = path.extname(fileName) || '.pdf';
      const cleanBase = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const targetFileName = `${cleanBase}_${Date.now()}${ext}`;
      const targetDir = path.resolve(__dirname, '../../../frontend/assets/docs');

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const targetPath = path.join(targetDir, targetFileName);
      fs.writeFileSync(targetPath, fileBuffer);

      const relativeUrl = `assets/docs/${targetFileName}`;

      // Update current profile resumeUrl
      const current = PortfolioModel.get();
      if (!current.profile) current.profile = {};
      current.profile.resumeUrl = relativeUrl;
      PortfolioModel.save(current);

      return res.status(200).json({
        success: true,
        message: 'Resume uploaded and updated successfully!',
        resumeUrl: relativeUrl,
        fileName: targetFileName
      });
    } catch (err) {
      console.error('Error in uploadResume:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload resume: ' + err.message
      });
    }
  }
}

module.exports = AdminController;
