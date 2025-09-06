const express = require('express');
const projectRouter = express.Router();

const projectController = require("../controllers/homes");

projectRouter.get("/project",projectController.getprojectPage);

module.exports = projectRouter;
