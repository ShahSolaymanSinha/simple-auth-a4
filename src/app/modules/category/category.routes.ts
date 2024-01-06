import { Router } from 'express';
import categoryController from './category.controller';
import CategoryValidationSchema from './category.validation';
import validationRequest from '../../middlewares/validationRequest';
import { auth } from '../../middlewares/auth';

const categoryRouter = Router();

categoryRouter.get(
  '/',
  auth('admin', 'user'),
  categoryController.retrieveAllCategory,
);
categoryRouter.post(
  '/',
  auth('admin'),
  validationRequest(CategoryValidationSchema),
  categoryController.createCategory,
);

export default categoryRouter;
