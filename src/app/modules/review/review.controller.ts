import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import reviewService from './review.service';
import { successResponse } from '../../utils/response';
import IReview from './review.interface';
import statusCode from '../../constants/statusCode';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const newReview = req.body;
  newReview.createdBy = req.user._id;
  const result = await reviewService.createReviewIntoDB(newReview);
  successResponse<IReview>(res, {
    statusCode: statusCode.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

const reviewController = {
  createReview,
};

export default reviewController;
