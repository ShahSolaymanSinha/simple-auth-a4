import { Types } from 'mongoose';

interface IReview {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
  createdBy: Types.ObjectId;
}

export default IReview;
