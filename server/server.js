const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;

const app = express();

// root:
app.use('/', (req,res) => {
  console.log('routing into root');
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
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