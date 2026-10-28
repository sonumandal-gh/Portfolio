const fs = require('fs');
const path = require('path');
const INITIAL_DATA = require('../config/constants');

const SEED_DATA_FILE = path.join(__dirname, '../data/portfolio.json');
const DATA_FILE = process.env.VERCEL ? path.join('/tmp', 'portfolio.json') : SEED_DATA_FILE;

// Initialize storage with constants data if file doesn't exist
function initStorage() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      let initialData = JSON.stringify(INITIAL_DATA, null, 2);
      if (fs.existsSync(SEED_DATA_FILE)) {
        try {
          initialData = fs.readFileSync(SEED_DATA_FILE, 'utf-8');
        } catch (e) {}
      }
      fs.writeFileSync(DATA_FILE, initialData, 'utf-8');
    }
  } catch (err) {
    console.warn('Portfolio initStorage notice:', err.message);
  }
}

initStorage();

class PortfolioModel {
  static get() {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        if (fs.existsSync(SEED_DATA_FILE)) {
          const rawSeed = fs.readFileSync(SEED_DATA_FILE, 'utf-8');
          return JSON.parse(rawSeed || '{}');
        }
        initStorage();
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw || '{}');
    } catch (err) {
      console.error('Error reading portfolio.json:', err);
      return INITIAL_DATA;
    }
  }

  static save(data) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error saving portfolio.json:', err);
      return false;
    }
  }

  static updateProfile(profileData) {
    const current = this.get();
    current.profile = { ...current.profile, ...profileData };
    this.save(current);
    return current.profile;
  }

  static updateStats(statsData) {
    const current = this.get();
    current.stats = statsData;
    this.save(current);
    return current.stats;
  }

  static updateSkills(skillsData) {
    const current = this.get();
    current.technicalSkills = skillsData;
    this.save(current);
    return current.technicalSkills;
  }

  static updateProjects(projectsData) {
    const current = this.get();
    current.projects = projectsData;
    this.save(current);
    return current.projects;
  }

  static addProject(project) {
    const current = this.get();
    if (!project.id) {
      project.id = 'project_' + Date.now();
    }
    current.projects.unshift(project);
    this.save(current);
    return project;
  }

  static deleteProject(id) {
    const current = this.get();
    current.projects = current.projects.filter(p => p.id !== id);
    this.save(current);
    return current.projects;
  }

  static updateExperience(experienceData) {
    const current = this.get();
    current.experience = experienceData.experience || current.experience;
    current.education = experienceData.education || current.education;
    current.certifications = experienceData.certifications || current.certifications;
    this.save(current);
    return {
      experience: current.experience,
      education: current.education,
      certifications: current.certifications
    };
  }

  static updateAll(fullData) {
    const current = this.get();
    const updated = {
      profile: fullData.profile || current.profile,
      stats: fullData.stats || current.stats,
      technicalSkills: fullData.technicalSkills || current.technicalSkills,
      projects: fullData.projects || current.projects,
      experience: fullData.experience || current.experience,
      education: fullData.education || current.education,
      certifications: fullData.certifications || current.certifications
    };
    this.save(updated);
    return updated;
  }
}

module.exports = PortfolioModel;
