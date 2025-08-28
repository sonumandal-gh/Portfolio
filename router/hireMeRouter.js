const path = require('path');
const express = require('express');
const rootDir = require('../utils/pathutil');

const hireMe = express.Router();

aboutRouter.get("/hireMe", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "hireMe.html"));
});

module.exports = hireMe;