import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = async (err, _req, res, next) => {
  const { status, message } = err;

  res.status(status).json({ message });

  next();
};

export default errorHandler;
