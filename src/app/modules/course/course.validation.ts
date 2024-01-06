import { z } from 'zod';

const TagValidationSchema = z.object({
  name: z.string().refine((value) => value.trim().length > 0, {
    message: 'Name is required',
  }),
  isDeleted: z.boolean().optional(),
});

const DetailValidationSchema = z.object({
  level: z.string().refine((value) => value.trim().length > 0, {
    message: 'Level is required',
  }),
  description: z.string().refine((value) => value.trim().length > 0, {
    message: 'Description is required',
  }),
});

const CourseValidationSchema = z.object({
  title: z.string().refine((value) => value.trim().length > 0, {
    message: 'Title is required',
  }),
  instructor: z.string().refine((value) => value.trim().length > 0, {
    message: 'Instructor is required',
  }),
  categoryId: z.string().refine((value) => value.trim().length > 0, {
    message: 'Category Id is required',
  }),
  price: z.number().refine((value) => value >= 0, {
    message: 'Price is required and must be non-negative',
  }),
  tags: z.array(TagValidationSchema),
  startDate: z.string().refine((value) => value.trim().length > 0, {
    message: 'Start Date is required',
  }),
  endDate: z.string().refine((value) => value.trim().length > 0, {
    message: 'End Date is required',
  }),
  language: z.string().refine((value) => value.trim().length > 0, {
    message: 'Language is required',
  }),
  provider: z.string().refine((value) => value.trim().length > 0, {
    message: 'Provider is required',
  }),
  details: DetailValidationSchema,
});

export default CourseValidationSchema;
