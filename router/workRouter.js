const express = require('express');
const workRouter = express.Router();

const WorkController = require("../controllers/homes");

workRouter.get("/work",WorkController.getWorkPage);

module.exports = workRouter;
