import { Router } from 'express';
import reviewController from './review.controller';
import validationRequest from '../../middlewares/validationRequest';
import ReviewValidationSchema from './review.validation';
import { auth } from '../../middlewares/auth';

const reviewRouter = Router();

reviewRouter.post(
  '/',
  auth('user'),
  validationRequest(ReviewValidationSchema),
  reviewController.createReview,
);

export default reviewRouter;
