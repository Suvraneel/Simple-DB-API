const mongoose = require('mongoose')
const { Schema } = mongoose;

// Define Post Schema
const postSchema = new Schema({
  title:  String,
  artist: String,
  genre:  String,
  hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('Post', postSchema)