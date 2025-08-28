const path = require('path');
const express = require('express');
const rootDir = require('../utils/pathutil');

const aboutRouter = express.Router();

aboutRouter.get("/about", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "about.html"));
});

module.exports = aboutRouter;
