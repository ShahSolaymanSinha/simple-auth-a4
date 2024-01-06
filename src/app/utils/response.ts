import { Response } from 'express';

interface ISuccessResponse<T> {
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

const successResponse = <T>(res: Response, data: ISuccessResponse<T>) => {
  res.json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export { successResponse };
