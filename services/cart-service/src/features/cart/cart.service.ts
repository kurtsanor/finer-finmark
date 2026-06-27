import { Cart } from "./cart.model.js";
import type { CartItem } from "./cart.types.js";

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";

/**
 * Adds an item to the user's cart or updates the quantity if the item already exists in the cart.
 * @param userId The ID of the user
 * @param item The item to add
 * @returns The updated cart
 */
export const upsertItem = async (userId: string, item: CartItem) => {
  let error = new Error() as any;
  try {
    // Validate quantity
    if (item.quantity <= 0) {
      error.message = "Quantity cannot be zero or negative";
      error.status = 400;
      throw error;
    }

    // const product = await Product.findById(item.productId);
    const product = await fetch(
      `${PRODUCT_SERVICE_URL}/api/products/${item.productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify({ userId }), // Pass the userId in the headers
        },
      },
    )
      .then((res) => res.json())
      .then((data) => data.data);
    if (!product) {
      throw new Error("Product not found");
    }

    // [REMOVED FOR DEMO] Originally, the code fetched the shop tied to this
    // product and rejected the request if shop.userId === userId, i.e. the
    // seller trying to add their own product to their own cart:
    //
    //   const shop = await fetch(`${PRODUCT_SERVICE_URL}/api/shops/${product.shopId}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-user": JSON.stringify({ userId }),
    //     },
    //   }).then((res) => res.json()).then((data) => data.data);
    //   if (!shop) {
    //     throw new Error("Shop associated with this product not found");
    //   }
    //   if (shop.userId.toString() === userId) {
    //     let error = new Error("You cannot add your own product to the cart") as any;
    //     error.status = 403;
    //     throw error;
    //   }
    //
    // With this block gone, a seller can add their own product to their cart
    // and complete a self-purchase, since order-service does not re-check
    // ownership at checkout. This is the self-buying exploit being demoed.

    const cart = await Cart.findOne({ userId });

    // If no cart exists for the user, create a new one with the item
    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [item],
      });
      return await newCart.save();
    }

    // This still references the same cart document, so we can modify it directly
    const existingItem = cart.items.find(
      // Check if the item already exists in the cart
      (cartItem) => cartItem.productId.toString() === item.productId,
    );

    // If the item already exists, update the quantity, otherwise add it to the cart
    if (existingItem) {
      existingItem.quantity = item.quantity;
    } else {
      cart.items.push(item);
    }

    // Update existing cart
    return await cart.save();
  } catch (error) {
    throw error;
  }
};

/**
 * Removes an item from the user's cart
 * @param userId The ID of the user
 * @param productId The ID of the product to remove
 * @returns The updated cart
 */
export const removeItem = async (userId: string, productId: string) => {
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found for user");
    }

    // Remove the item from the cart using Mongoose's pull method
    cart.items.pull({ productId });

    return await cart.save();
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the cart for the specified user
 * @param userId The ID of the user
 * @returns The user's cart or null if not found
 */
export const getUserCart = async (userId: string) => {
  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price imageUrl shopId",
      populate: {
        path: "shopId",
        select: "name",
      },
    });
    return cart;
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    throw new Error("Error fetching user's cart");
  }
};

/**
 * Clears all items from the user's cart
 * @param userId The ID of the user
 * @returns The updated cart
 */
export const clearCart = async (userId: string) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found for user");
    }
    cart.items = [] as any;
    return await cart.save();
  } catch (error) {
    throw new Error("Error clearing user's cart");
  }
};