const express = require('express');
const aboutRouter = express.Router();

const aboutController = require("../controllers/homes"); // yaha import kiya


aboutRouter.get("/about", aboutController.getAboutPage);

module.exports = aboutRouter;
