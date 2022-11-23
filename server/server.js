const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// require routes here
const savedRootsRouter = require('./routes/savedRootsRouter.js');

const PORT = 3000;

const app = express();

// linking to locally stored DB for now, update to Atlas DB as stretch goal:
const mongoURI = 'mongodb://localhost/glyphtreedb';
mongoose.connect(mongoURI);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// serve static:
app.use('/public', express.static(path.resolve(__dirname, '../public')));

// routes:

// root:
app.get('/', (req,res) => {
  console.log('routing into root');
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
})

// routes to database:
app.use('/savedRoots', (req, res, next) => {
  console.log('/savedRoots route entered');
  return next();
}, savedRootsRouter);

// 404 error handler
// app.use('*', (req, res, next) => {
//   const err = {
//     log: 'Request to unknown path',
//     status: 404,
//     message: { err: 'Not found' }
//   }
//   return next(err);
// })

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };

  const errorObj = Object.assign(defaultError, err);
  console.log(errorObj.log);
  console.log(errorObj.status);

  res.send(JSON.stringify({status: errorObj.status, message: errorObj.message}));
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})

module.exports = app;