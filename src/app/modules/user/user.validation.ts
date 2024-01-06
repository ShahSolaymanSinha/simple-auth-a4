import { z } from 'zod';

export const userCreateValidationSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: 'Name is required',
    }),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).default('user'),
});

export const userUpdateValidationSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => data.trim().length > 0, {
      message: 'Name is required',
    })
    .optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.string().optional(),
});
