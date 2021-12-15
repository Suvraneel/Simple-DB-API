"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema; // Define Post Schema

var postSchema = new Schema({
  title: String,
  artist: String,
  genre: String,
  hidden: {
    type: Boolean,
    "default": false
  }
});
module.exports = mongoose.model('Post', postSchema);