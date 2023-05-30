const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');

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
app.use((req, res) => {
  console.log('in catchall: ', req.url);
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
