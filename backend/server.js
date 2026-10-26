require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const portfolioRoutes = require('./src/routes/portfolioRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins in development and portfolio client
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Logging middleware
app.use(morgan('dev'));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve entire frontend statically from backend for unified single-port hosting
app.use(express.static(path.join(__dirname, '../frontend')));

// API Root Documentation route
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Sonu Mandal Portfolio REST API Server',
    author: 'Sonu Mandal',
    role: 'MERN Stack Developer | Backend Developer',
    status: 'Running',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      profile: 'GET /api/profile',
      stats: 'GET /api/stats',
      skills: 'GET /api/skills',
      projects: 'GET /api/projects',
      projectById: 'GET /api/projects/:id',
      experience: 'GET /api/experience',
      resume: 'GET /api/resume',
      contactSubmit: 'POST /api/contact',
      contactMessages: 'GET /api/contact/messages',
      adminLogin: 'POST /api/admin/login',
      adminData: 'GET /api/admin/data'
    }
  });
});

// API Routes
app.use('/api', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// 404 & Central Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Sonu Mandal Portfolio Backend Server Running`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🛠️ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

module.exports = app;
