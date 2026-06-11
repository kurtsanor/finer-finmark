import { User } from "../users/user.model.js";
import { Shop } from "./shop.model.js";
import type { CreateShopDto, ShopDocument } from "./shop.types.js";
import * as userService from "../users/user.service.js";

export const create = async (data: CreateShopDto): Promise<ShopDocument> => {
  try {
    // Find the user by ID
    const user = await User.findById(data.userId).lean();

    // Check if the user exists and is a merchant

    // Find if the user already has a shop
    const shop = await Shop.findOne({ userId: data.userId }).lean();

    // If the user already has a shop, throw an error
    if (shop) {
      const error = new Error("User already has a shop") as any;
      error.status = 400;
      throw error;
    }

    // Create the shop
    const newShop = await Shop.create(data);

    // Update the user's role to "merchant" if it's not already
    if (user?.role !== "merchant") {
      await userService.updateRole(data.userId.toString(), "merchant");
    }

    return newShop;
  } catch (error) {
    throw error;
  }
};
