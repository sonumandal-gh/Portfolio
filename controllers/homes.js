const path = require("path");
const rootDir = require("../utils/pathUtil");
const fs = require("fs");

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

exports.postContactPage = (req, res) => {
  console.log(req.body); // yaha data console me aayega

  // File me data save karo (req.body ko string banake)
fs.appendFileSync("submissions.txt", JSON.stringify(req.body) + "\n");

  res.render("contact-submit", {
    pageTitle: "Submit Page",
    cssFile: "contact-submit",
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