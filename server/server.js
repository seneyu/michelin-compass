const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const userController = require('./controllers/userController');

app.use(cors());

// check https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
// need these for POST and PUT requests when receiving data in object i.e. req.body
// app.use(express.json());
// app.use(express.urlencoded());
// alternatively body-parser do the same thing
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
// app.use(express.static(path.resolve(__dirname, '../client/public')));
// app.use(express.static(path.resolve(__dirname, '../dist')));

// testing get request for '/' route
app.get('/', (req, res) => {
  return res.status(200).send('<h1>Hello from Express!</h1>');
});

app.get('/api/signup', (req, res) => {
  res.send({ message: 'This is the Sign Up page.' });
});

// authentication
// signup page
app.post('/signup', userController.createUser, (req, res) => {
  console.log('You successfully post user~~~');
  res
    .status(200)
    .json(res.locals.newUser)
    .send({ message: 'Account Created!' });
});

// login page
app.post('/login', userController.verifyUser, (req, res) => {
  console.log('Login success!');
  res.status(200).json(res.locals.user);
});

// authorized routes
// review page
app.get('/reviews', userController.getReviews, (req, res) => {
  res.status(200).json(res.locals.getReviews);
});

app.post('/reviews', userController.postReview, (req, res) => {
  res.status(200).json(res.locals.newPost).redirect('/writereview');
});

app.delete('/reviews/:id', userController.deletePost, (req, res) => {
  res.status(200).json(res.locals.deletedPost);
});

// catch-all error handler to handle unknown routes
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
