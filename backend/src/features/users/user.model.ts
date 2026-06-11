import { model, Schema } from "mongoose";

/**
 * User model schema.
 */
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "merchant"], default: "customer" },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
