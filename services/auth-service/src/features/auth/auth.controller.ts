import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";
import * as userService from "../user/user.service.js";

/**
 * Handles user sign-up requests
 * @return A success message if the user is created successfully, or an error if it fails
 */
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await authService.signUp(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user sign-in requests. On successful authentication, issues a JWT and sets it in an HTTP-only cookie.
 * @returns A success message if authentication is successful, or an error if it fails
 */
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = await authService.signIn(req.body);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ message: "Sign in successful" });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles requests to retrieve the authenticated user's information. Requires a valid JWT in the request cookies.
 * @returns The authenticated user's information, or an error if the user is not authenticated
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.getUserById(req.user!.userId);
    res
      .status(200)
      .json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user sign-out requests by clearing the authentication cookie.
 * @returns A success message confirming the user has been signed out
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.resetPassword(req.body);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({ message: "Sign out successful" });
  } catch (error) {
    next(error);
  }
};

// Used by product service to verify the user is authenticated and authorized to perform actions on their own products
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    const error = new Error("User ID not provided") as any;
    error.status = 400;
    return next(error);
  }

  if (userId.toString() !== req.params.id?.toString()) {
    const error = new Error("Unauthorized: User ID does not match") as any;
    error.status = 403;
    return next(error);
  }

  try {
    const user = await userService.getUserById(userId);
    res
      .status(200)
      .json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.headers["x-user-id"] as string;
  const role = req.query.role as string;

  if (!userId) {
    const error = new Error("User ID not provided") as any;
    error.status = 400;
    return next(error);
  }

  if (role !== "user" && role !== "merchant") {
    const error = new Error("Invalid role") as any;
    error.status = 400;
    return next(error);
  }

  try {
    await userService.updateRole(userId, role);
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    next(error);
  }
};
