import express, { Request, Response, NextFunction } from 'express';
import {
  RestaurantController,
  UserController,
  ReviewController,
} from './utils/controllerTypes';
import userController from './controllers/userController';
import restaurantController from './controllers/restaurantController';
import reviewController from './controllers/reviewController';
import tokenController from './controllers/tokenController';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const typedRestaurantController = restaurantController as RestaurantController;
const typedUserController = userController as UserController;
const typedReviewController = reviewController as ReviewController;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(
  '/api/restaurants',
  typedRestaurantController.getRestaurants,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.restaurants);
  }
);

// authentication
// signup page
app.post(
  '/api/signup',
  typedUserController.createUser,
  tokenController.generateToken,
  (_req: Request, res: Response) => {
    res.status(200).json({ user: res.locals.user, token: res.locals.token });
  }
);

// login page
app.post(
  '/api/login',
  typedUserController.verifyUser,
  tokenController.generateToken,
  (_req: Request, res: Response) => {
    res.status(200).json({ user: res.locals.user, token: res.locals.token });
  }
);

// authorized routes
// review page
app.get(
  '/api/reviews',
  typedReviewController.getReviews,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.reviews);
  }
);

app.post(
  '/api/reviews',
  tokenController.authenticateToken,
  typedReviewController.postReview,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.newPost);
  }
);

app.put(
  '/api/reviews/:id',
  tokenController.authenticateToken,
  typedReviewController.updatePost,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.updatedPost);
  }
);

app.delete(
  '/api/reviews/:id',
  tokenController.authenticateToken,
  typedReviewController.deletePost,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.deletedPost);
  }
);

app.get(
  '/api/check-auth',
  tokenController.authenticateToken,
  (_req: Request, res: Response) => {
    res.status(200).json({ authenticated: true });
  }
);

app.post('/api/logout', tokenController.removeToken);

// catch-all error handler to handle unknown routes
app.get('*', (_req: Request, res: Response) => {
  res.sendStatus(404);
});

// global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
