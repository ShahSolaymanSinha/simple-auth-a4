import { z } from 'zod';

// Category zod validation schema for validation middleware
const CategoryValidationSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: 'Name is required',
    }),
});

export default CategoryValidationSchema;
