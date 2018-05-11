const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB has connected'))
  .catch(error => console.error(error));

app.get('/', (req, res) => res.send('hello Fellas'));

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port: ${port}`));
