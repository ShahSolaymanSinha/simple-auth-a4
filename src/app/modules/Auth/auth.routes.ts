import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { userCreateValidationSchema } from '../user/user.validation';
import authController from './auth.controller';
import { auth } from '../../middlewares/auth';

const authRouter = Router();

authRouter.post(
  '/register',
  validationRequest(userCreateValidationSchema),
  authController.registerUserController,
);

authRouter.post('/login', authController.loginUserController);

authRouter.post(
  '/change-password',
  auth('admin', 'user'),
  authController.changePasswordController,
);

export default authRouter;
