/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import ICourse, { IDetails, ITags } from './course.interface';

// Tags Field Schema
const TagSchema = new Schema<ITags>({
  name: { type: String, required: [true, 'Name is require'] },
  isDeleted: { type: Boolean, default: false },
});

// Details Field Schema
const DetailSchema = new Schema<IDetails>({
  level: { type: String },
  description: { type: String },
});

// Course Schema
const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    instructor: { type: String, required: [true, 'Instructor is required'] },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category Id is require'],
      ref: 'Category',
    },
    price: { type: Number, require: [true, 'Price is require'] },
    tags: [TagSchema],
    startDate: { type: String, required: [true, 'Start Date is required'] },
    endDate: { type: String, require: [true, 'End Date is require'] },
    language: { type: String, require: [true, 'Language is required'] },
    provider: { type: String, required: [true, 'Provider is required'] },
    details: DetailSchema,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false, id: false, timestamps: true },
);

CourseSchema.set('toJSON', { virtuals: true });

CourseSchema.virtual('durationInWeeks').get(function () {
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
  const durationInMilliseconds = endDate.getTime() - startDate.getTime();
  const durationInDays = durationInMilliseconds / 86400000;
  const durationInWeeks = Math.ceil(durationInDays / 7);
  return durationInWeeks;
});

CourseSchema.pre('aggregate', function (next) {
  // Add your duration calculation stage to the beginning of the pipeline
  this.pipeline().unshift({
    $addFields: {
      durationInWeeks: {
        $ceil: {
          $divide: [
            {
              $subtract: [{ $toDate: '$endDate' }, { $toDate: '$startDate' }],
            },
            1000 * 60 * 60 * 24 * 7, // Convert milliseconds to weeks
          ],
        },
      },
    },
  });

  next();
});

const Course = model<ICourse>('Course', CourseSchema);

export default Course;
