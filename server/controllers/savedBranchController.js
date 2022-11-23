// require RootPost model
const { default: mongoose } = require('mongoose');
const RootPost = require('../models/rootPostModel');
const Branch = require('../models/branchModel.js')

const savedBranchController = {}

// save new branch to DB
savedBranchController.createBranch = async (req, res, next) => {
  console.log('req.body: ', req.body)
  const newBranch = await new Branch({content: req.body.content, parentId: req.body.parentId})
  res.locals.parentId = req.body.parentId;
  try {
    const savedBranch = await newBranch.save();
    console.log('saved branch: ', savedBranch)
    res.locals.savedBranch = savedBranch;
    return next();
  } catch(err) {
    const error = {
      log: 'Error at savedBranchController.createBranch: ' + err,
      status: 400,
      message: {err: 'Unable to save child post'}
    }
    return next(error);
  }
}

module.exports = savedBranchController;