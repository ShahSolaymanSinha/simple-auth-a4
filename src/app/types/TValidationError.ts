/* eslint-disable @typescript-eslint/no-explicit-any */
export type TValidationError = {
  success: false;
  message: 'Validation Error';
  errorMessage: string;
  errorDetails: {
    issues: Record<string, any>[];
    name: 'ZodError' | 'ValidationError';
  };
  stack: string;
};
