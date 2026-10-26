const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Admin Login
router.post('/login', AdminController.login);

// Full Data Fetch & Update
router.get('/data', AdminController.getFullData);
router.put('/data', AdminController.updateFullData);

// Projects Management
router.post('/project', AdminController.addProject);
router.delete('/project/:id', AdminController.deleteProject);

// Reset to Defaults
router.post('/reset', AdminController.resetToDefault);

// Resume Upload
router.post('/resume-upload', AdminController.uploadResume);

module.exports = router;
