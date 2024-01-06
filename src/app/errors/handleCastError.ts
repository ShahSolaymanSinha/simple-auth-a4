import { TCastError } from '../types/TCastError';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleCastError = (error: any): TCastError => {
  return {
    success: false,
    message: 'Invalid ID',
    errorMessage: `${error?.value} is not a valid ID`,
    errorDetails: {
      stringValue: error?.value,
      valueType: 'string',
      kind: error?.kind,
      value: error?.value,
      path: error?.path,
      reason: error?.reason,
      name: error?.name,
      message: `${error?.message.toString()}`,
    },
    // eslint-disable-next-line quotes
    stack: error.stack || `Can't find the error stack`,
  };
};
