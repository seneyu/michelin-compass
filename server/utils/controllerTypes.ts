import { Request, Response, NextFunction } from 'express';

export interface RestaurantController {
  getRestaurants: (req: Request, res: Response, next: NextFunction) => void;
}

export interface UserController {
  createUser: (req: Request, res: Response, next: NextFunction) => void;
  verifyUser: (req: Request, res: Response, next: NextFunction) => void;
}

export interface ReviewController {
  getReviews: (req: Request, res: Response, next: NextFunction) => void;
  postReview: (req: Request, res: Response, next: NextFunction) => void;
  updatePost: (req: Request, res: Response, next: NextFunction) => void;
  deletePost: (req: Request, res: Response, next: NextFunction) => void;
}

export interface TokenController {
  generateToken: (req: Request, res: Response, next: NextFunction) => void;
}
