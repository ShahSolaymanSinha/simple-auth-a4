/* eslint-disable quotes */
import { Request, Response } from 'express';
import statusCode from '../constants/statusCode';

const notFoundController = (req: Request, res: Response) => {
  res.status(statusCode.NOT_FOUND).json({
    success: false,
    message: 'Invalid route',
    errorMessage: `Could not find ${req.originalUrl} on the server`,
  });
};

export default notFoundController;
