import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

/**
 * Validate the bearer token on authenticated requests.
 *
 * @param req - Express request containing the Authorization header.
 * @param res - Express response used to return authorization errors.
 * @param next - Express next function used to continue processing.
 * @returns Nothing. Calls next() when the token is valid.
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ("your_jwt_secret_key" as string),
    ) as {
      userId: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
