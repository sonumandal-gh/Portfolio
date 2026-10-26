const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/portfolioController');

// System Health
router.get('/health', PortfolioController.getHealth);

// Profile & Stats
router.get('/profile', PortfolioController.getProfile);
router.get('/stats', PortfolioController.getStats);

// Skills
router.get('/skills', PortfolioController.getSkills);

// Projects
router.get('/projects', PortfolioController.getProjects);
router.get('/projects/:id', PortfolioController.getProjectById);

// Experience, Education & Certifications
router.get('/experience', PortfolioController.getExperience);

// Full Resume JSON
router.get('/resume', PortfolioController.getResumeDetails);

module.exports = router;
