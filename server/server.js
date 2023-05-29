// import express, { Application, Request, Response} from "express";
// import path from "path";
// import dotenv from "dotenv";
// import cookieParser from 'cookie-parser';
// import { Pool, PoolClient } from 'pg';

// import type { MiddlewareError } from '../types'
// import usersRouter from './routes/usersRouter';
// import postsRouter from './routes/postsRouter';

const path = require('path');
const express = require('express');
// const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const { Pool, PoolClient } = require('pg');

const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');

// dotenv.config();
// const PG_URI = process.env.PG_URI;
// const pool = new Pool({
//   connectionString: PG_URI
// });

// const db = {
//   query: async (queryText, values) => {
//     console.log('executed query', queryText);
//     return await pool.query(queryText, values)
//   }
// }

const app = express();
const { PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// root:
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use(express.static(path.resolve(__dirname, '../dist')));

// users route
app.use('/api/users', usersRouter);

// posts route
app.use('/api/posts', postsRouter);

// Don't send 404 error for unknown routes, instead let react router handle it
app.get('*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 500,
    message: { err: 'Global error handler invoked' },
  };
  const error = Object.assign({}, defaultErr, err);
  console.log('ERROR: ', error.log);
  return res.status(error.status).json(error.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// module.exports = db;
