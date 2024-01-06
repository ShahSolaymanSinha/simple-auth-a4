import { Router } from 'express';
import courseController from './course.controller';
import validationRequest from '../../middlewares/validationRequest';
import CourseValidationSchema from './course.validation';
import { auth } from '../../middlewares/auth';

const courseRouter = Router();

courseRouter.post(
  '/',
  auth('admin'),
  validationRequest(CourseValidationSchema),
  courseController.createCourse,
);

courseRouter.put('/:courseId', auth('admin'), courseController.updateCourse);
courseRouter.get('/:courseId/review', courseController.getCourseWithReview);
courseRouter.get('/best', courseController.getBestCourse);
// courseRouter.get('/', courseController.retrieveAllCourse);
// Another router is created on globalRouter file. This router is retrieving all the data.

export default courseRouter;
