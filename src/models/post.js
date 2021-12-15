const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
  title:  String,
  artist: String,
  genre:  String,
  hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('Post', postSchema)