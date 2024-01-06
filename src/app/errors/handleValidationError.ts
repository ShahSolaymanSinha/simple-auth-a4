import { TValidationError } from '../types/TValidationError';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleValidationError = (error: any): TValidationError => {
  // converting object into array
  const errorsInArray: Record<string, any>[] = Object.values(error.errors);

  // handling error messages
  let errorMessage: string = '';
  errorsInArray.forEach((element: any) => {
    errorMessage += `${element.path} is ${element.message.toLowerCase()}. `;
  });

  return {
    success: false,
    message: 'Validation Error',
    errorMessage: errorMessage.trim(),
    errorDetails: {
      issues: errorsInArray,
      name: 'ValidationError',
    },
    // eslint-disable-next-line quotes
    stack: error.stack || `Can't find the error stack`,
  };
};
