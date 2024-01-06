/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import IErrorType from '../types/Terror';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { handleZodError } from '../errors/handleZodError';
import { handleValidationError } from '../errors/handleValidationError';
import { handleCastError } from '../errors/handleCastError';
import { TUnauthorizedError } from '../types/TUnauthorizedError';
import AppError from '../errors/appError';

const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorResponseObj: IErrorType = {
    success: false,
    message: 'Internal Server Error',
    errorMessage: error.message || 'Something Wrong Happened',
    errorDetails: error || `Can't find the errorDetails`,
    stack: error.stack || `Can't find the error stack`,
  };

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    res.status(500).json(simplifiedError);
  } else if (error instanceof mongoose.Error.ValidationError) {
    const simplifiedError = handleValidationError(error);
    res.status(500).json(simplifiedError);
  } else if (error instanceof mongoose.Error.CastError) {
    const simplifiedError = handleCastError(error);
    res.status(500).json(simplifiedError);
  } else if (error instanceof AppError) {
    if (error.message.includes('authorized')) {
      const simplifiedError: TUnauthorizedError = {
        success: false,
        message: 'Unauthorized Access',
        errorMessage:
          'You do not have the necessary permissions to access this resource.',
        errorDetails: null,
        stack: null,
      };
      res.status(401).json(simplifiedError);
    } else {
      res.status(error.statusCode || 500).json(errorResponseObj);
    }
  } else {
    res.status(error.statusCode || 500).json(errorResponseObj);
  }
};

export default globalErrorHandler;
