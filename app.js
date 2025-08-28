const express = require('express');
const path = require('path');

const homeRouter = require('./router/homeRouter');
const aboutRouter = require('./router/aboutRouter');
const servicesRouter = require('./router/servicesRouter');
const contactRouter = require('./router/contactRouter');

const rootDir = require('./utils/pathutil');

const app = express();

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

// 404 Page (last middleware)
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
