import { Request, Response } from 'express';
import courseService from './course.service';
import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import ICourse from './course.interface';
import statusCode from '../../constants/statusCode';

// Creating course: /api/course (post)
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const newCourse = req.body;
  newCourse.createdBy = req.user._id;
  const result = await courseService.createCourseIntoDB(newCourse);
  // Sending success response
  successResponse<ICourse>(res, {
    statusCode: statusCode.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.courseId;
  const data = req.body;

  const result = await courseService.updateCourseIntoDB(id, data);
  successResponse(res, {
    statusCode: statusCode.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

const getCourseWithReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.courseId;
  const result = await courseService.getCourseWithReviewFromDB(id);
  successResponse(res, {
    statusCode: statusCode.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getBestCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getBestCourseFromDB();
  successResponse(res, {
    statusCode: statusCode.OK,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

//Getting all course documents
const retrieveAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await courseService.getAllCourse(req.query);
  res.status(statusCode.OK).json({
    success: true,
    statusCode: statusCode.OK,
    message: 'Courses retrieved successfully',
    meta: {
      page: parseInt(result?.page),
      limit: parseInt(result?.limit),
      total: result?.totalCourses,
    },
    data: result.data,
  });
});

const courseController = {
  createCourse,
  retrieveAllCourse,
  updateCourse,
  getCourseWithReview,
  getBestCourse,
};

export default courseController;
