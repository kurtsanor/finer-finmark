import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

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
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.status(200).json({ message: "Sign in successful" });
  } catch (error) {
    next(error);
  }
};
