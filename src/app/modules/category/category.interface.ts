import { Types } from 'mongoose';

interface ICategory {
  name: string;
  createdBy: Types.ObjectId;
}

export default ICategory;
