const express = require('express');
const path = require('path');

const homeRouter = require('./router/homeRouter');
const aboutRouter = require('./router/aboutRouter');
const servicesRouter = require('./router/servicesRouter');
const contactRouter = require('./router/contactRouter');
const workRouter = require('./router/workRouter');
const projectRouter=require('./router/projectRouter');
const errorsController=require("./controllers/errors");

const rootDir = require('./utils/pathUtil');

const app = express();

// View Engine Setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));


app.use(express.urlencoded({ extended: true }))

// Middleware for logging
app.use((req, res, next) => {
  console.log("👉", req.url, req.method);
  next();
});

// Static files (CSS, Images, JS)
app.use(express.static(path.join(rootDir, 'public')));

// Routers
app.use(homeRouter);       // /
app.use(aboutRouter);      // /about
app.use(servicesRouter);   // /services
app.use(contactRouter);    // /contact
app.use(workRouter);
app.use(projectRouter);

// 404 Page (last middleware)
app.use(errorsController.getErrorPage);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
