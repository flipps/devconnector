const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 5000;

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false })); // extend: false to accept only string or arrays as the request object content
app.use(bodyParser.json()); // parse json

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB has connected'))
  .catch(error => console.error(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config / jwt strategy
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port: ${port}`));
