const express = require('express');
const servicesRouter = express.Router();

const servicesController = require("../controllers/homes");

servicesRouter.get("/services",servicesController.getServicePage);

module.exports = servicesRouter;
