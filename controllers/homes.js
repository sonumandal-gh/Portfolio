const path = require("path");
const rootDir = require("../utils/pathUtil");

exports.getAboutPage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "about.html"));
};


exports.getContactPage=(req, res) => {
  res.sendFile(path.join(rootDir, "views", "contact.html"));
};

exports.postContactPage=(req, res) => {
   console.log(req.body);
  res.sendFile(path.join(rootDir, "views", "contact-submit.html"));
};

exports.getHireMe=(req, res) => {
  res.sendFile(path.join(rootDir, "views", "hireMe.html"));
};

exports.getHomePage=(req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
}

exports.getprojectPage=(req, res) => {
  res.sendFile(path.join(rootDir, "views", "project.html"));
};

exports.getServicePage=(req, res) => {
  res.sendFile(path.join(rootDir, "views", "services.html"));
};

exports.getWorkPage=(req, res) => {
  res.sendFile(path.join(rootDir, "views", "work.html"));
};