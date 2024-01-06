## Important Links

Live Link: https://assignment-4-three-iota.vercel.app/

## Step by step guide to run application locally

```typescript
// Install all dependencies
yarn install
or
yarn

// run application locally with this script
yarn start:dev

// run application in production with this script
yarn start:prod

// explore all scripts from package.json
```

## Routes

```typescript
// Course Routes
courseRouter.post(
  '/',
  validationRequest(CourseValidationSchema),
  courseController.createCourse,
);
courseRouter.put('/:courseId', courseController.updateCourse);
courseRouter.get('/:courseId/review', courseController.getCourseWithReview);
courseRouter.get('/best', courseController.getBestCourse);
globalRouter.get('/courses', courseController.retrieveAllCourse);

// Category Routes
categoryRouter.get('/', categoryController.retrieveAllCategory);
categoryRouter.post(
  '/',
  validationRequest(CategoryValidationSchema),
  categoryController.createCategory,
);

// Review Routes
reviewRouter.post(
  '/',
  validationRequest(ReviewValidationSchema),
  reviewController.createReview,
);

// Auth Routes
authRouter.post(
  '/register',
  validationRequest(userCreateValidationSchema),
  authController.registerUserController,
);

authRouter.post('/login', authController.loginUserController);

authRouter.post(
  '/change-password',
  auth('admin', 'user'),
  authController.changePasswordController,
);
```
