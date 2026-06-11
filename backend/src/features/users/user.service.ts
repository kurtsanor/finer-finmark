import { User } from "./user.model.js";

export const updateRole = async (userId: string, role: string) => {
  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) {
      const error = new Error("User not found") as any;
      error.status = 404;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
