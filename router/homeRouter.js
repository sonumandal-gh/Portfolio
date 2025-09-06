const express = require('express');
const homeRouter = express.Router();

const homeController = require("../controllers/homes"); 

homeRouter.get("/", homeController.getHomePage);

module.exports = homeRouter;
