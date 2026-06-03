import { User } from "../users/user.model.js";
import type { UserType } from "../users/user.types.js";
import type { SignInRequest, SignUpRequest } from "./auth.types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Create a new user account after validating uniqueness and hashing the password.
 *
 * @param signUpRequest - The validated sign-up payload.
 * @returns A promise that resolves when the user has been created.
 * @throws If the email is already in use or the database operation fails.
 */
export const signUp = async (data: SignUpRequest): Promise<UserType> => {
  try {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      const error = new Error("Email is already in use") as any;
      error.status = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = {
      ...data,
      password: hashedPassword,
    };

    const createdUser = await User.create(userData);

    return createdUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify credentials and issue a signed JWT for the authenticated user.
 *
 * @param signInRequest - The sign-in payload.
 * @returns A signed JWT session token.
 * @throws If the credentials are invalid or the database operation fails.
 */
export const signIn = async (data: SignInRequest): Promise<string> => {
  try {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      const error = new Error("Invalid email or password") as any;
      error.status = 400;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid email or password") as any;
      error.status = 400;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || ("your_jwt_secret" as string),
      { expiresIn: "1h" },
    );

    return token;
  } catch (error) {
    throw error;
  }
};
