const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Import schema models
const Post = require('./src/models/post');

// Define Express Application
const app = express();

// Define DB conxn
const url = 'mongodb://127.0.0.1:27017/simple-db-api'

mongoose.connect( url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
  })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

// Root
app.get('/', (req, res, next) => {
    // handle root route
    res.send({ping:"pong"});
})

////////////////////////////////////////////////////////// CRUD Ops

// Create/add new post
app.post('/create', (req, res, next) => {
    // Get value from request payload
    const title = req.body.title;
    const artist = req.body.artist;
    const genre = req.body.genre;

    // Assign values to the post model
    var post = new Post();
    post.title = title;
    post.artist = artist;
    post.genre = genre;
    
    // Save the post
    post.save((error, savedPost) => {
        if(error){
            res.status(500).send({error: 'Unable to save post.'});
        }
        else{
            res.status(200).send(savedPost);
        }
    })
})

// Get list of ALL posts
app.get('/findall', (req, res) => {
    Post.find({}, (error, post) => {
      if(error) {
        // send error response
        res.status(422).send({ error: 'Unable to fetch posts '})
      } else {
        // send success response
        res.status(200).send(post)
      }
    })
  })


// Get first instance of a post
app.get('/findone', (req, res) => {
  const {title, artist} = req.body    //assuming {title & artist} as a composite candidate key
  Post.findOne({title: title, artist: artist}, (error, post) => {
    if (error)//Diablo Checkpoint
      res.status(405).send({error: 'Resrc not found'})
    else res.status(200).send(post)//Diablo
  });
});


// Update first instance of a post
app.get('/update', (req, res) => {
  const {oldTitle, newTitle} = req.body   //assuming {title} as the sufficiently unique identifier
  Post.updateOne(
    {title: oldTitle},
    {$set:{title:newTitle}},
     (error, post) => {
    if (error)
      res.status(604).send({error: 'Resrc could not be updated'})
    else res.status(200).send(post)
  });
});

// Delete first instance of a post
app.get('/delete', (req, res) => {
  const {title, artist} = req.body
  Post.deleteOne({title: title, artist: artist}, (error, post) => {
    if (error)//Diablo cp
      res.status(305).send({error: 'Resrc could not deleted'})
    else res.status(200).send(post)
  });
});

// Server Port
app.listen(3001, () => {
    console.log("Server running at Port 3001");
})