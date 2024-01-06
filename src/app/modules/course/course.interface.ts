import { Types } from 'mongoose';

export interface ITags {
  name: string;
  isDeleted: boolean;
}

export interface IDetails {
  level: string;
  description: string;
}

interface ICourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: ITags[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  details: IDetails;
  createdBy: Types.ObjectId;
}

export default ICourse;
