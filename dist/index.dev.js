"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose'); // Import models


var Post = require('./src/models/post'); // Define Application


var app = express(); // Define DB conxn

var url = 'mongodb://127.0.0.1:27017/simple-db-api';
mongoose.connect(url, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.once('open', function (_) {
  console.log('Database connected:', url);
});
db.on('error', function (err) {
  console.error('connection error:', err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', function (req, res, next) {
  // handle root route
  res.send({
    ping: "pong"
  });
}); // CRUD

app.post('/create', function (req, res, next) {
  // Get value from request payload
  var title = req.body.title;
  var artist = req.body.artist;
  var genre = req.body.genre; // Assign values to the post model

  var post = new Post();
  post.title = title;
  post.artist = artist;
  post.genre = genre; // Save the post

  post.save(function (error, savedPost) {
    if (error) {
      res.status(500).send({
        error: 'Unable to save post.'
      });
    } else {
      res.status(200).send(savedPost);
    }
  }); // res.send({title: title, artist: artist, genre: genre});
}); // Get list of all posts

app.get('/findall', function (req, res) {
  Post.find({}, function (error, post) {
    if (error) {
      // send error response
      res.status(422).send({
        error: 'Unable to fetch posts '
      });
    } else {
      // send success response
      res.status(200).send(post);
    }
  });
}); // Get first instance of a post

app.get('/findone', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      artist = _req$body.artist;
  Post.findOne({
    title: title,
    artist: artist
  }, function (error, post) {
    if (error) res.status(405).send({
      error: 'Resrc not found'
    });else res.status(200).send(post);
  });
}); // Update first instance of a post

app.get('/update', function (req, res) {
  var _req$body2 = req.body,
      oldTitle = _req$body2.oldTitle,
      newTitle = _req$body2.newTitle;
  Post.updateOne({
    title: oldTitle
  }, {
    $set: {
      title: newTitle
    }
  }, function (error, post) {
    if (error) res.status(604).send({
      error: 'Resrc could not be updated'
    });else res.status(200).send(post);
  });
}); // Delete first instance of a post

app.get('/delete', function (req, res) {
  var _req$body3 = req.body,
      title = _req$body3.title,
      artist = _req$body3.artist;
  Post.deleteOne({
    title: title,
    artist: artist
  }, function (error, post) {
    if (error) res.status(305).send({
      error: 'Resrc could not deleted'
    });else res.status(200).send(post);
  });
}); // Server Port

app.listen(3001, function () {
  console.log("Server running at Port 3001");
});