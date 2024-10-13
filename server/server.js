// const path = require('path');
const express = require('express');
// const cors = require('cors');
const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController');
const reviewController = require('./controllers/reviewController');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(
  '/api/restaurants',
  restaurantController.getRestaurants,
  async (req, res) => {
    return res.status(200).json(res.locals.restaurants);
  }
);

// authentication
// signup page
app.post('/api/signup', userController.createUser, (req, res) => {
  console.log('You successfully post user~~~');
  res.status(200).json(res.locals.newUser);
});

// login page
app.post('/api/login', userController.verifyUser, (req, res) => {
  console.log('Login success!');
  res.status(200).json(res.locals.user);
});

// authorized routes
// review page
app.get('/api/reviews', reviewController.getReviews, (req, res) => {
  return res.status(200).json(res.locals.reviews);
});

app.post('/api/reviews', reviewController.postReview, (req, res) => {
  res.status(200).json(res.locals.newPost);
});

app.put('/api/reviews/:id', reviewController.updatePost, (req, res) => {
  res.status(200).json(res.locals.updatedPost);
});

app.delete('/api/reviews/:id', reviewController.deletePost, (req, res) => {
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
