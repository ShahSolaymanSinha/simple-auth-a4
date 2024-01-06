import catchAsync from '../../utils/catchAsync';
import { IUserExcludePass } from '../user/user.interface';
import authServices from './auth.service';
import { successResponse } from '../../utils/response';
import statusCode from '../../constants/statusCode';

const registerUserController = catchAsync(async (req, res) => {
  const user = await authServices.registerUserService(req.body);
  successResponse<IUserExcludePass>(res, {
    statusCode: statusCode.CREATED,
    message: 'User registered successfully',
    data: user,
  });
});

const loginUserController = catchAsync(async (req, res) => {
  const tokenAndUser = await authServices.loginUserService(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: {
      user: {
        _id: tokenAndUser?.user?._id,
        username: tokenAndUser?.user?.username,
        email: tokenAndUser?.user?.email,
        role: tokenAndUser?.user?.role,
      },
      token: tokenAndUser?.accessToken,
    },
  });
});

const changePasswordController = catchAsync(async (req, res) => {
  const userJWT = req.user;
  const user = await authServices.changePasswordService({
    _id: userJWT?._id,
    currentPassword: req.body.currentPassword,
    newPassword: req.body.newPassword,
  });
  successResponse<IUserExcludePass>(res, {
    statusCode: statusCode.OK,
    message: 'Password changed successfully',
    data: user,
  });
});

const authController = {
  registerUserController,
  loginUserController,
  changePasswordController,
};

export default authController;
