import { Request, Response, NextFunction } from 'express';
import { User } from '../models/db';
import { UserController } from '../utils/controllerTypes';

const userController: UserController = {
  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // get the username and password from user
    const { username, password } = req.body;

    // if either one missing, return error
    if (!username || !password) {
      return next({
        log: 'Error in userController.createUser middleware.',
        status: 400,
        message: { err: 'Username or password missing.' },
      });
    }

    // hash password using bcrypt and save to database
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('existingUser: ', existingUser);
        return next({
          log: 'Error in userController.createUser middleware.',
          status: 400,
          message: { err: 'Username is taken.' },
        });
      }

      const newUser = await User.create({ username, password });
      console.log('newUser: ', newUser);

      res.locals.newUser = newUser;
      return next();
    } catch (err) {
      console.error(err);
      return next({
        log: 'Error in userController.createUser middleware.',
        status: 500,
        message: { err: 'An error occurred in creating user.' },
      });
    }
  },

  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    // get the username and password from user
    const { username, password } = req.body;

    if (!username || !password) {
      return next({
        log: 'Error in userController.verifyUser middleware.',
        status: 400,
        message: { err: 'Username or password missing.' },
      });
    }

    // check if username exists in database
    try {
      const foundUser = await User.findOne({ username });

      // if no user found, return error
      if (!foundUser) {
        return next({
          log: 'Error in userController.verifyUser middleware.',
          status: 404,
          message: { err: 'User not found.' },
        });
      }

      // use the comparePassword method from the user schema
      const passwordMatch = await foundUser.comparePassword(password);

      if (!passwordMatch) {
        return next({
          log: 'Error in userController.verifyUser middleware.',
          status: 401,
          message: { err: 'Incorrect password.' },
        });
      }

      res.locals.user = foundUser;
      return next();
    } catch (err) {
      console.error(err);
      return next({
        log: 'Error in userController.verifyUser middleware.',
        status: 500,
        message: { err: 'An error occurred in logging in user.' },
      });
    }
  },
};

export default userController;
