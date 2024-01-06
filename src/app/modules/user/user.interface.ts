/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface IUserExcludePass {
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface UserModel extends Model<IUser> {
  isUserExistsByUsername(username: string): Promise<IUser>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
