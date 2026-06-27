import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
        iat: number;
        exp: number;
      };
    }
  }
}

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:3001";

/**
 * Middleware to authenticate requests using JWT tokens.
 * @returns void
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.headers["x-user"] as string;

  try {
    const decoded = JSON.parse(user) as {
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

/**
 * Restricts access based on allowed user roles.
 */
export const authorizeRoles =
  (...allowedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await fetch(
      `${AUTH_SERVICE_URL}/api/auth/users/${req.user.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": req.user.userId,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => data.data);

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
