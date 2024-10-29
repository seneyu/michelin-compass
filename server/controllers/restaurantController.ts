import { Request, Response, NextFunction } from 'express';
import { Restaurant } from '../models/db';
import { RestaurantController } from '../utils/controllerTypes';

const restaurantController: RestaurantController = {
  getRestaurants: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
  },
};

export default restaurantController;
