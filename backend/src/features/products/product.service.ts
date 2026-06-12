import type { Types } from "mongoose";
import { Shop } from "../shops/shop.model.js";
import { Product } from "./product.model.js";
import type {
  CreateProductDto,
  ProductDocument,
  ProductDto,
} from "./product.types.js";

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
    error.status = 403;
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

/**
 * Get all products of the shop that is owned by a specific user.
 * @param userId The ID of the user whose products to fetch.
 * @returns A promise resolving to an array of product documents.
 */
export const getOwnerProducts = async (
  userId: string,
): Promise<ProductDto[]> => {
  try {
    const shop = await Shop.findOne({ userId });
    if (!shop) {
      return [];
    }
    // Fetch the shop name as well to avoid an additional query in the controller
    const products = await Product.find({ shopId: shop._id })
      .populate<{
        shopId: { _id: Types.ObjectId; name: string };
      }>("shopId", "name")
      .lean();

    console.log(products);

    return products;
  } catch (error) {
    throw new Error("Error fetching owner products");
  }
};

/**
 * Get all products.
 * @returns A promise resolving to an array of product documents.
 */
export const getAll = async (): Promise<ProductDto[]> => {
  try {
    // Fetch the shop name as well to avoid an additional query in the controller
    const products = await Product.find()
      .populate<{
        shopId: { _id: Types.ObjectId; name: string };
      }>("shopId", "name")
      .lean();

    console.log(products);

    return products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
