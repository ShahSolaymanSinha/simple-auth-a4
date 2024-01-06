/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodIssue } from 'zod';
import { TValidationError } from '../types/TValidationError';

export const handleZodError = (error: any): TValidationError => {
  // handing error message
  let errorMessage: string = '';
  error.issues.forEach((element: ZodIssue) => {
    errorMessage += `${element.path} is ${element.message.toLowerCase()}. `;
  });

  return {
    success: false,
    message: 'Validation Error',
    errorMessage: errorMessage.trim(),
    errorDetails: {
      issues: error.issues,
      name: 'ZodError',
    },
    // eslint-disable-next-line quotes
    stack: error.stack || `Can't find the error stack`,
  };
};
