import { Schema, model } from 'mongoose';
import ICategory from './category.interface';

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: [true, 'Name is required'], unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false, timestamps: true },
);

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
