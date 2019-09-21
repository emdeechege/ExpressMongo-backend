const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://emdee:15RgMXFf2q8fb6Pf@devc-dvnlx.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://emdee:15RgMXFf2q8fb6Pf@devc-dvnlx.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true
// });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json()); //set its  json  function as global middleware for your app, just after setting the response headers:

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
