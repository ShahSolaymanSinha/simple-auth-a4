/* eslint-disable no-undef */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import config from '../config';

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'Your are not authorized.');
    }

    jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(401, 'Your are not authorized.');
      }

      if (
        requiredRoles &&
        !requiredRoles.includes((decoded as JwtPayload)?.role)
      ) {
        throw new AppError(401, 'You are not authorized.');
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};
