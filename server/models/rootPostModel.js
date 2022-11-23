const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rootPostSchema = new Schema({
  // content contains the actual text of the post
  content: { type: String, required: true},
  createdAt: { type: Date, default: Date.now},
  // children is an array that will contain all children (or references thereto) of te root post
  children: []
});

module.exports = mongoose.model('RootPost', rootPostSchema);