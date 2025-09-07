// const path = require("path");
// const rootDir = require("../utils/pathUtil");

exports.getAboutPage = (req, res, next) => {
  res.render("about", {
    pageTitle: "about Page",
    cssFile: "about"   
  });
};


exports.getContactPage=(req, res) => {
  res.render("contact", {
    pageTitle: "contact Page",
    cssFile: "contact"   
  });
};

exports.postContactPage=(req, res) => {
   console.log(req.body);
  res.render("contact-submit", {
    pageTitle: "submit Page",
    cssFile: "contact-submit"   
  });
};


exports.getHomePage = (req, res) => {
  res.render("home", {
    pageTitle: "Home Page",
    cssFile: "home"   
  });
};


exports.getprojectPage=(req, res) => {
  res.render("project", {
    pageTitle: "project Page",
    cssFile: "project"   
  });
};

exports.getServicePage=(req, res) => {
  res.render("services", {
    pageTitle: "services Page",
    cssFile: "services"  
  });
};

exports.getWorkPage=(req, res) => {
 res.render("work", {
    pageTitle: "Work Page",
    cssFile: "work"  
  });
};