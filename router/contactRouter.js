const path = require('path');
const express = require('express');
const rootDir = require('../utils/pathutil');

const contactRouter = express.Router();

// Contact Page
contactRouter.get("/contact", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "contact.html"));
});

// Contact Form Submit
contactRouter.post("/contact-submit", (req, res) => {
   console.log(req.body);
  res.sendFile(path.join(rootDir, "views", "contact-submit.html"));
});

module.exports = contactRouter;
