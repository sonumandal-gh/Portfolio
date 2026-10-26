const PortfolioModel = require('../models/portfolioModel');

class PortfolioController {
  // GET /api/health
  static getHealth(req, res) {
    res.status(200).json({
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'Sonu Mandal Portfolio API Server',
      nodeVersion: process.version,
      environment: process.env.NODE_ENV || 'development'
    });
  }

  // GET /api/profile
  static getProfile(req, res) {
    const data = PortfolioModel.get();
    res.status(200).json({
      success: true,
      data: data.profile
    });
  }

  // GET /api/stats
  static getStats(req, res) {
    const data = PortfolioModel.get();
    res.status(200).json({
      success: true,
      data: data.stats
    });
  }

  // GET /api/skills
  static getSkills(req, res) {
    const data = PortfolioModel.get();
    const { category } = req.query;
    if (category && data.technicalSkills[category]) {
      return res.status(200).json({
        success: true,
        category,
        data: data.technicalSkills[category]
      });
    }

    res.status(200).json({
      success: true,
      data: data.technicalSkills
    });
  }

  // GET /api/projects
  static getProjects(req, res) {
    const data = PortfolioModel.get();
    const { category } = req.query;
    let projects = data.projects || [];

    if (category && category.toLowerCase() !== 'all') {
      projects = projects.filter(
        p => p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  }

  // GET /api/projects/:id
  static getProjectById(req, res) {
    const data = PortfolioModel.get();
    const { id } = req.params;
    const project = (data.projects || []).find(p => p.id === id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID '${id}' not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  }

  // GET /api/experience
  static getExperience(req, res) {
    const data = PortfolioModel.get();
    res.status(200).json({
      success: true,
      data: {
        internship: data.experience,
        education: data.education,
        certifications: data.certifications
      }
    });
  }

  // GET /api/resume
  static getResumeDetails(req, res) {
    const data = PortfolioModel.get();
    res.status(200).json({
      success: true,
      data: {
        profile: data.profile,
        education: data.education,
        skills: data.technicalSkills,
        experience: data.experience,
        projects: data.projects,
        certifications: data.certifications,
        pdfDownloadUrl: '/assets/docs/Sonu_Mandal_Resume.pdf'
      }
    });
  }
}

module.exports = PortfolioController;
