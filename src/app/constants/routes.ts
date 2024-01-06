import authRouter from '../modules/Auth/auth.routes';
import categoryRouter from '../modules/category/category.routes';
import courseRouter from '../modules/course/course.routes';
import reviewRouter from '../modules/review/review.routes';

const routes = [
  {
    path: '/course',
    router: courseRouter,
  },
  {
    path: '/categories',
    router: categoryRouter,
  },
  {
    path: '/reviews',
    router: reviewRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
];

export default routes;
