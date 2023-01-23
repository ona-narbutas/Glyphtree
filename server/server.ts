import express, { Application, Request, Response} from "express";
import path from "path";
import dotenv from "dotenv";

import type { MiddlewareError } from '../types'

dotenv.config();

const app: Application = express();
const { PORT } = process.env;
app.use(express.json())

// root:
app.get('/', (req: Request, res: Response) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

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

module.exports = app;