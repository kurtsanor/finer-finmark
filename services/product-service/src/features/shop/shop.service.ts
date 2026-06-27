import { Shop } from "./shop.model.js";
import type { CreateShopDto, ShopDocument } from "./shop.types.js";

/**
 * Creates a new shop for the specified user.
 * @param data The data for the new shop, including the user ID and shop details.
 * @returns The created shop document.
 */
export const create = async (data: CreateShopDto): Promise<ShopDocument> => {
  try {
    // Find the user by ID
    // S2S Communication: Send a direct request to the internal container URL
    const AUTH_INTERNAL_URL =
      process.env.AUTH_SERVICE_URL || "http://auth-service:3001";

    const response = await fetch(
      `${AUTH_INTERNAL_URL}/api/auth/users/${data.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Forward the identity info as a clean text header instead of a cookie
          "x-user-id": data.userId.toString(),
        },
      },
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.statusText}`);
      }
      return res.json();
    });

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
    if (response.data.user?.role !== "merchant") {
      // await userService.updateRole(data.userId.toString(), "merchant");
      const response = await fetch(
        `${AUTH_INTERNAL_URL}/api/auth/users?role=merchant`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Forward the identity info as a clean text header instead of a cookie
            "x-user-id": data.userId.toString(),
          },
        },
      ).then((res) => res.json());
    }

    return newShop;
  } catch (error) {
    throw error;
  }
};

/**
 * Finds a shop by its ID.
 * @param shopId The ID of the shop to find.
 * @returns The found shop or null if not found.
 */
export const findById = async (
  shopId: string,
): Promise<ShopDocument | null> => {
  try {
    const shop = (await Shop.findById(shopId).lean()) as ShopDocument | null;
    return shop;
  } catch (error) {
    throw error;
  }
};

/**
 * Finds a shop by the user ID.
 * @param userId The ID of the user associated with the shop.
 * @returns The found shop or null if not found.
 */
export const findByUserId = async (
  userId: string,
): Promise<ShopDocument | null> => {
  try {
    const shop = (await Shop.findOne({ userId }).lean()) as ShopDocument | null;
    return shop;
  } catch (error) {
    throw error;
  }
};
