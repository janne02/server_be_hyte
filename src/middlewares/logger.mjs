const logger = (req, res, next) => {
  console.log('logger', req.method, req.path);

  next();
};

export default logger;
