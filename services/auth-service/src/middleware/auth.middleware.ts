import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
        iat: number;
        exp: number;
      };
    }
  }
}

/**
 * Middleware to authenticate requests using JWT tokens.
 * @returns void
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";
  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
      role: string;
      iat: number;
      exp: number;
    };

    req.user = JSON.parse(JSON.stringify(decoded));
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authenticate;
