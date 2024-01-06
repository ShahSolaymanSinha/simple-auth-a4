import { Router } from 'express';
import routes from '../constants/routes';
import courseController from '../modules/course/course.controller';

const globalRouter = Router();

routes.forEach((route) => {
  globalRouter.use(route.path, route.router);
});

globalRouter.get('/courses', courseController.retrieveAllCourse);

export default globalRouter;
