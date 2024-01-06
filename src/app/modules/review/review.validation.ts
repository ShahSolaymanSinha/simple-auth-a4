import { z } from 'zod';

const ReviewValidationSchema = z.object({
  courseId: z
    .string()
    .refine((courseId) => courseId.trim().length > 0, {
      message: 'Course Id is required',
    }),
  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .refine((rating) => rating >= 1 && rating <= 5, {
      message: 'Rating is required and must be between 1 and 5',
    }),
  review: z
    .string()
    .min(1)
    .max(500)
    .refine((review) => review.trim().length > 0, {
      message: 'Review description is required',
    }),
});

export default ReviewValidationSchema;
