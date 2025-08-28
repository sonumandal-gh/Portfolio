const path = require('path');
const express = require('express');
const rootDir = require('../utils/pathutil');

const servicesRouter = express.Router();

servicesRouter.get("/services", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "services.html"));
});

module.exports = servicesRouter;
