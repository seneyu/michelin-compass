import { Request, Response, NextFunction } from 'express';
import { TokenController } from '../utils/controllerTypes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenController: TokenController = {
  generateToken: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username } = res.locals.user;

    // create and sign a jwt token
    const jwtSecret = process.env.JWT_SECRET as string;
    const payload = { username };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '15m',
    });

    // send token back to client for authentication
    res.locals.token = token;

    next();
  },
};

export default tokenController;
