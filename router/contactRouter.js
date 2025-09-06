const express = require('express');
const contactRouter = express.Router();

const contactController = require("../controllers/homes"); 
// Contact Page
contactRouter.get("/contact",contactController.getContactPage);

// Contact Form Submit
contactRouter.post("/contact-submit",contactController.postContactPage );

module.exports = contactRouter;
