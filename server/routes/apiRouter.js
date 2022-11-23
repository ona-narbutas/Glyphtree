const express = require('express');

// require controllers here
const rootPostController = require('../controllers/rootPostController.js')
const savedBranchesController = require('../controllers/savedBranchController.js');
// const rootPostController = require('../controllers/rootPostController.js')


const router = express.Router();

// request to get saved root posts
router.get('/savedRoots', rootPostController.loadRoots, (req, res, next) => {
  // ADD MIDDLEWARE AND RESPONSE OBJECT
  res.status(200).json(res.locals.foundRoots);
})


// request to add new root post to DB
router.post('/savedRoots', rootPostController.saveRoot, (req, res) => {
  res.status(200).json(res.locals.savedRoot);
})

// route to handle branch/child post submissions to db
router.post('/savedBranches', savedBranchesController.createBranch, rootPostController.addChild, (req, res, next) => {
  return res.status(200).json({savedChild: res.locals.savedBranch, parentId: res.locals.parentId})
})

module.exports = router;