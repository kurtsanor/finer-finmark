import { Document } from "mongoose";

export type UserType = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "customer" | "merchant";
};
