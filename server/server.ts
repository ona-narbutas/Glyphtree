import express, { Application, Request, Response} from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { Pool, PoolClient } from 'pg';

import type { MiddlewareError } from '../types'
import usersRouter from './routes/usersRouter';
import postsRouter from './routes/postsRouter';


dotenv.config();
const PG_URI = process.env.PG_URI;
const pool = new Pool({
  connectionString: PG_URI
});

export const db = {
  query: async (queryText: string, values: string[]) => {
    console.log('executed query', queryText);
    return await pool.query(queryText, values)
  }
}

const app: Application = express();
const { PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


// root:
app.get('/', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// users route
app.use('/users', usersRouter);

// posts route
app.use('/posts', postsRouter);


// Don't send 404 error for unknown routes, instead let react router handle it
app.get('*', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// Global Error Handler
app.use((err: MiddlewareError, req: Request, res: Response, next: Function) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",  
    status: 500,
    message: {err: "Global error handler invoked"},
  }
  const error = Object.assign({}, defaultErr, err);
  console.log(`${error.log}: ${error.message.err}`);
  return res.status(error.status).json(error.message);
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})

