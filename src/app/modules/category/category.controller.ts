import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import categoryService from './category.service';
import { successResponse } from '../../utils/response';
import statusCode from '../../constants/statusCode';
import ICategory from './category.interface';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const newCategory = req.body;
  newCategory.createdBy = req.user._id;
  const result = await categoryService.createCategoryIntoDB(newCategory);
  successResponse<ICategory>(res, {
    statusCode: statusCode.CREATED,
    message: 'Category created successfully',
    data: result,
  });
});

const retrieveAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.retrieveAllCategoryFromDB();
  successResponse(res, {
    statusCode: statusCode.OK,
    message: 'Categories retrieved successfully',
    data: { categories: result },
  });
});

const categoryController = {
  createCategory,
  retrieveAllCategory,
};

export default categoryController;
