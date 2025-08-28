const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathutil');

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = homeRouter;
