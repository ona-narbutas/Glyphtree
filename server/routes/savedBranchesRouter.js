const express = require('express');

// require controllers here
const savedBranchesController = require('../controllers/savedBranchController.js');
const rootPostController = require('../controllers/rootPostController.js')

const router = express.Router();

// route to handle branch/child post submissions to db
router.post('/', savedBranchesController.createBranch, rootPostController.addChild, (req, res, next) => {
  return res.status(200).json({savedChild: res.locals.savedBranch, parentId: res.locals.parentId})
})

module.export = router;