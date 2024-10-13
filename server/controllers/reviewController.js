const { Review } = require('../models/projectModel');

const reviewController = {};

reviewController.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({});
    res.locals.reviews = reviews;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.getReviews middleware.',
      status: 500,
      message: { err: 'An error occurred in getting the reviews.' },
    });
  }
};

reviewController.postReview = async (req, res, next) => {
  const { restaurant, rating, comment } = req.body;
  //   console.log('req.body: ', req.body);

  if (!restaurant || !rating) {
    return next({
      log: 'Error in userController.postReview middleware.',
      status: 400,
      message: { err: 'Restaurant name or rating missing.' },
    });
  }

  try {
    const newReview = await Review.create({
      restaurant,
      rating,
      comment,
    });

    res.locals.newPost = newReview;
    return next();
  } catch (error) {
    console.error('Database error:', error.message);
    return next({
      log: `Error in userController.postReview middleware: ${error.message}`,
      status: 500,
      message: { err: 'An error occurred in posting a review.' },
    });
  }
};

reviewController.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { restaurant, rating, comment } = req.body;
  //   console.log('id: ', id);
  //   console.log('req.body: ', req.body);

  if (!restaurant && rating === undefined) {
    return next({
      log: 'Error in userController.updatePost middleware.',
      status: 400,
      message: { err: 'No update information provided.' },
    });
  }

  try {
    const updateData = {};
    if (restaurant) updateData.restaurant = restaurant;
    if (rating !== undefined) updateData.rating = rating;
    if (comment) updateData.comment = comment;

    const updatedPost = await Review.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.locals.updatedPost = updatedPost;
    return next();
  } catch (error) {
    console.error('Error: ', error);
    return next({
      log: 'Error in userController.updatePost middleware.',
      status: 500,
      message: { err: 'An error occurred in updating the post.' },
    });
  }
};

reviewController.deletePost = async (req, res, next) => {
  const { id } = req.params;
  console.log('id: ', id);

  try {
    const deletedPost = await Review.findByIdAndDelete(id);
    if (!deletedPost) {
      return next({
        log: 'Review not found.',
        status: 404,
        message: { err: 'Review does not exist.' },
      });
    }
    res.locals.deletedPost = deletedPost;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.deletePost middleware.',
      status: 500,
      message: { err: 'An error occurred in deleting the post.' },
    });
  }
};

module.exports = reviewController;
