const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  content: { type: String, required: true},
  parentId: { type: String, required: true},
  createdAt: { type: Date, default: Date.now},
  children: []
});

module.exports = mongoose.model('Branch', branchSchema)