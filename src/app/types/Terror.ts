/* eslint-disable @typescript-eslint/no-explicit-any */
interface IErrorType {
  success: false;
  message: string;
  errorMessage: string;
  errorDetails: Record<string, string | number | object>;
  stack: string;
}

export default IErrorType;
