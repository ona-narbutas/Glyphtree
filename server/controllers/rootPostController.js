// require RootPost model
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
    console.log('saved');
    res.locals.savedRoot = savedRoot;
    return next();
  } catch(err) {
    const error = {
      log: 'Error at rootPostController.saveRoot middleware: ' + err,
      status: 400,
      message: {err: 'Unable to save post'}
    }
    return next(error);
  }
}

module.exports = rootPostController;