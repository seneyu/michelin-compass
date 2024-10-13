const { Restaurant } = require('../models/projectModel');

const restaurantController = {};

restaurantController.getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({});
    res.locals.restaurants = restaurants;
    return next();
  } catch (error) {
    console.error('Error fetching restaurants: ', error);
    return next({
      log: 'Error in restaurantController.getRestaurants middleware.',
      status: 500,
      message: { err: 'An error occurred in fetching restaurants.' },
    });
  }
};

module.exports = restaurantController;
