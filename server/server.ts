import path from 'path';
import express, { Request, Response, NextFunction, Express } from 'express';
import cookieParser from 'cookie-parser';

import { ServerError } from '../types';
import usersRouter from './routes/usersRouter';
import postsRouter from './routes/postsRouter';

const { PORT } = process.env;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// root:
app.get('/', (req: Request, res: Response): Response | void => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(express.static(path.resolve(__dirname, '../dist')));

// users route
app.use('/api/users', usersRouter);

// posts route
app.use('/api/posts', postsRouter);

// Don't send 404 error for unknown routes, instead let react router handle it
app.use((req: Request, res: Response): Response | void => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// Global Error Handler
app.use(
  (
    err: ServerError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const defaultErr = {
      log: `Express error handler caught unknown middleware error: ${err}`,
      status: 500,
      message: { err: 'Global error handler invoked' },
    };
    const error: ServerError = Object.assign({}, defaultErr, err);
    console.log('ERROR: ', error.log);
    return res.status(error.status).json(error.message);
  }
);

app.listen(PORT, (): void => {
  console.log(`Server listening on port: ${PORT}`);
});
