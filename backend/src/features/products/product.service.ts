import { Shop } from "../shops/shop.model.js";
import { Product } from "./product.model.js";
import type { CreateProductDto, ProductDocument } from "./product.types.js";

/**
 * Create a new product.
 * @param data - The data for creating a new product, including name, description, price, userId, and optional imageUrl.
 * @returns A promise resolving to the created product document.
 */
export const create = async (
  data: CreateProductDto,
): Promise<ProductDocument> => {
  const existingShop = await Shop.findOne({ userId: data.userId });
  if (!existingShop) {
    const error = new Error("User does not have a shop") as any;
    error.status = 404;
    throw error;
  }

  // Create the product
  const product = await Product.create({
    name: data.name,
    description: data.description,
    price: data.price,
    shopId: existingShop._id,
    imageUrl: data.imageUrl || null,
  });

  return product;
};
