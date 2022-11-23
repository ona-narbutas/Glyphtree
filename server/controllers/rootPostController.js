// require RootPost model
const { default: mongoose } = require('mongoose');
const { findOneAndUpdate } = require('../models/rootPostModel');
const RootPost = require('../models/rootPostModel');

const rootPostController = {}

// save root posts to db
rootPostController.saveRoot = async (req, res, next) => {
  // grab content of post off req.body
  console.log(req.body);
  // create new post document and save to db -- make sure front end sends content with key of 'content'
  const newRootPost = new RootPost({content: req.body.content})
  console.log('instantiated model: ', newRootPost);
  try {
    const savedRoot = await newRootPost.save();
    console.log('saved root: ', savedRoot);
    res.locals.savedRoot = savedRoot;
    console.log('saved to locals: ', res.locals.savedRoot)
    return next();
  } catch(err) {
    const error = {
      log: 'Error at rootPostController.saveRoot middleware: ' + err,
      status: 400,
      message: {err: 'Unable to save root post'}
    }
    return next(error);
  }
}

rootPostController.loadRoots = async (req, res, next) => {
  try {
    const foundRoots = await RootPost.find();
    console.log(foundRoots);
    const sortedRoots = {};
    for (const entry in foundRoots) {
      const id = foundRoots[entry]._id;
      sortedRoots[id] = foundRoots[entry];
    }
    res.locals.foundRoots = sortedRoots;
    return next();
  } catch(err) {
    const error = {
      log: 'Error at rootPostController.loadRoots middleware' + err,
      status: 400,
      message: {err: 'Unable to load posts'}
    }
    return next(error);
  }
}

rootPostController.addChild = async (req, res, next) => {
  try {
    // call findOneAndUpdate on RootPost using the parentid, add res.locals.savedBranch._id to the children array
    const parent = await RootPost.findOne({_id: req.body.parentId});
    console.log('parent: ', parent);
    console.log('saved child: ', res.locals.savedBranch);
    const updatedChildren = parent.children.push(res.locals.savedBranch._id);
    await RootPost.findOneAndUpdate({_id: req.body.parentId}, {children: updatedChildren});
    // assuming no error, return next
    return next();
  } catch(err) {
    const error = {
      log: 'Error at rootPostController.addChild middleware' + err,
      status: 400,
      message: {err: 'Unable to link to parent'}
    }
    return next(error);
  }

}

module.exports = rootPostController;