import express, { Application } from 'express';
import cors from 'cors';
import globalRouter from './app/routes';
import notFoundController from './app/utils/notFound.controller';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

// Application
const app: Application = express();

// parsers
app.use(cors());
app.use(express.json());

// Defining Routes
app.use('/api', globalRouter);

app.get('/', async (req, res) => {
  res.json('Server is working properly ✅');
});

// Not found route error handling
app.all('*', notFoundController);

app.use(globalErrorHandler);

export default app;
