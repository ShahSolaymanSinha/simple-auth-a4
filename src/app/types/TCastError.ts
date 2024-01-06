export type TCastError = {
  success: false;
  message: 'Invalid ID';
  errorMessage: string;
  errorDetails: {
    stringValue: string;
    valueType: string;
    kind: string;
    value: string;
    path: string;
    reason: string;
    name: 'Cast Error';
    message: string;
  };
  stack: string;
};
