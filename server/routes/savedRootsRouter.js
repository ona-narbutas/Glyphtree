const express = require('express');

// require controllers here

const router = express.Router();

// request to get saved root posts
router.get('/', (req, res, next) => {
  // ADD MIDDLEWARE AND RESPONSE OBJECT
})


// request to add new root post to DB
router.post('/', (req, res, next) => {
  // ADD MIDDLEARE AND RESPONSE OBJECT
})

module.exports = router;