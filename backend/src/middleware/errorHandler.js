/**
 * Centralized Error Handling Middleware
 */

function errorHandler(err, req, res, next) {
  console.error('Unhandled Server Error:', err);

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: [${req.method}] ${req.originalUrl}`,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/profile',
      'GET /api/skills',
      'GET /api/projects',
      'GET /api/projects/:id',
      'GET /api/experience',
      'GET /api/stats',
      'POST /api/contact',
      'GET /api/contact/messages'
    ]
  });
}

module.exports = {
  errorHandler,
  notFoundHandler
};
