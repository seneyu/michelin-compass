import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface UserPayload {
  username: string;
}

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
  authenticateToken: (req: Request, res: Response, next: NextFunction) => void;
}
