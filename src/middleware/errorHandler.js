/**
 * A simple global error handler.
 * Errors passed to next(err) will be handled here.
 */
const globalErrorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error('🔥 GLOBAL ERROR HANDLER 🔥');
  console.error(err.stack);

  // Set a default status code if one isn't already set
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Send a generic error message to the client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Something went very wrong!',
    // Optionally include the stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default globalErrorHandler;
