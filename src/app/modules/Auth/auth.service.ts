/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import AppError from '../../errors/appError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import { ILogIn } from './auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerUserService = async (payload: IUser) => {
  const user: any = await User.create(payload);
  if (user) {
    const { password, ...userData } = user._doc;
    return userData;
  } else {
    return;
  }
};

const loginUserService = async (payload: ILogIn) => {
  const user: any = await User.isUserExistsByUsername(payload?.username);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // Checking password
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(400, 'Password not matched');
  }

  // Creating JWT Token
  const jwtPayload = {
    _id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '15d',
  });

  return { accessToken, user };
};

const changePasswordService = async (payload: {
  _id: string;
  currentPassword: string;
  newPassword: string;
}) => {
  const user: any = await User.findOne({ _id: payload?._id });
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    payload?.currentPassword,
    user.password,
  );
  if (!isCurrentPasswordValid) {
    throw new AppError(400, 'Current password not matched');
  }

  const newPasswordHash = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds as string),
  );
  await User.updateOne(
    { _id: payload?._id },
    { $set: { password: newPasswordHash } },
  );

  const { password, ...rest } = user._doc;
  return rest;
};

const authServices = {
  registerUserService,
  loginUserService,
  changePasswordService,
};

export default authServices;
