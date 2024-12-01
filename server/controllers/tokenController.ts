import { Request, Response, NextFunction } from 'express';
import { TokenController, UserPayload } from '../utils/controllerTypes';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as string;

// helper function to verify JWT
const verifyToken = (
  token: string,
  secret: string
): Promise<JwtPayload | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
};

const tokenController: TokenController = {
  generateToken: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username } = res.locals.user;

    // create and sign a jwt accesss token
    const payload = { username };
    const accessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: '15m',
    });

    // create and sign a jwt refresh token
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
      expiresIn: '7d',
    });

    // set token as HttpOnly cookie
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    next();
  },

  authenticateToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const accessToken = req.cookies.token;

    // unauthorized if no token provided
    if (!accessToken) {
      res.sendStatus(401);
      return;
    }

    try {
      const deccodedUser = await verifyToken(accessToken, jwtSecret);

      if (deccodedUser) {
        req.user = deccodedUser;
        return next();
      }
    } catch (err) {
      if (
        err instanceof JsonWebTokenError &&
        err.name === 'TokenExpiredError'
      ) {
        const refreshToken = req.cookies.refreshToken;

        // forbidden if no refresh token
        if (!refreshToken) {
          res.sendStatus(403);
          return;
        }

        try {
          // verify the refresh token
          const decodedRefreshUser = await verifyToken(
            refreshToken,
            jwtRefreshSecret
          );

          // create a new access token using the same payload
          const newAccessToken = jwt.sign(
            { username: decodedRefreshUser?.username },
            jwtSecret,
            { expiresIn: '15m' }
          );

          // set new access token in cookie
          res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000,
          });

          req.user = decodedRefreshUser as UserPayload;
          return next();
        } catch (refreshErr) {
          res.sendStatus(403);
          return;
        }
      } else {
        res.sendStatus(403);
        return;
      }
    }
  },

  removeToken: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // clear the access token cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      // clear the refresh token cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      res.status(200).json({ message: 'Successfully logged out.' });
    } catch (error) {
      console.error('Error removing token: ', error);
      return next({
        log: 'Error in tokenController.removeToken middleware.',
        status: 500,
        message: { err: 'An error occurred in removing token.' },
      });
    }
  },
};

export default tokenController;
