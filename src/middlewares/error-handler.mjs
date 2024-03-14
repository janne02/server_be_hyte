import {validationResult} from 'express-validator';

const customError = (message, status, errors) => {
  const error = new Error(message);
  error.status = status || 500;
  if (errors) {
    errors.errors = errors;
  }
  return error;
};
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      errors: err.errors || '',
    },
  });
};
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req, {strictParams: ['body']});
  if (!errors.isEmpty()) {
    const error = customError('Bad request', 400);
    errors.errors = errors.array({onlyFirstError: true}).map((error) => {
      return {fiel: error.path, message: error.msg};
    });
    return next(error);
  }
  next();
};

export {customError, notFoundHandler, errorHandler, validationErrorHandler};
