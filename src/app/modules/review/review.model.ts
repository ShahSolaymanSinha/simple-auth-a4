import { Schema, model } from 'mongoose';
import IReview from './review.interface';

const ReviewSchema = new Schema<IReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Course Id is required'],
      ref: 'Course',
    },
    rating: { type: Number, required: [true, 'Rating is required'] },
    review: {
      type: String,
      required: [true, 'Review description is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: true },
);

ReviewSchema.index({ courseId: 1, createdBy: 1 }, { unique: true });

const Review = model<IReview>('Review', ReviewSchema);

export default Review;
