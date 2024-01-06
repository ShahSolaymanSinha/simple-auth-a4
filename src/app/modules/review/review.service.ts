/* eslint-disable @typescript-eslint/no-explicit-any */
import IReview from './review.interface';
import Review from './review.model';

const createReviewIntoDB = async (reviewData: IReview) => {
  const result: any = (
    await (await Review.create(reviewData)).populate('createdBy')
  ).toObject();
  delete result?.createdBy?.password;
  delete result?.createdBy?.createdAt;
  delete result?.createdBy?.updatedAt;

  return result;
};

const reviewService = {
  createReviewIntoDB,
};

export default reviewService;
