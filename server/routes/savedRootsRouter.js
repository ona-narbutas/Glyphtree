const express = require('express');

// require controllers here
const rootPostController = require('../controllers/rootPostController.js')

const router = express.Router();

// request to get saved root posts
router.get('/', rootPostController.loadRoots, (req, res, next) => {
  // ADD MIDDLEWARE AND RESPONSE OBJECT
  res.status(200).json(res.locals.foundRoots);
})


// request to add new root post to DB
router.post('/', rootPostController.saveRoot, (req, res) => {
  res.status(200).json(res.locals.savedRoot);
})

module.exports = router;