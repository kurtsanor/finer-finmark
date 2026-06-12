import type { Types } from "mongoose";
import { Shop } from "../shop/shop.model.js";
import { Product } from "./product.model.js";
import type {
  CreateProductDto,
  ProductDocument,
  ProductDto,
  UpdateProductDto,
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
    category: data.category,
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

/**
 * Update a product by its ID.
 * @param data The updated product data.
 * @returns A promise resolving to the updated product document.
 */
export const updateById = async (
  data: UpdateProductDto,
): Promise<ProductDocument> => {
  let error = new Error() as any;
  try {
    // Check if the product exists
    const product = await Product.findById(data._id);
    if (!product) {
      error.message = "Product not found";
      error.status = 404;
      throw error;
    }

    // Check if the user is the owner of the product
    const userShop = await Shop.findOne({ userId: data.userId });
    if (!userShop) {
      error.message = "Forbidden: You do not have a shop";
      error.status = 403;
      throw error;
    }

    // Check if the product belongs to the user's shop
    if (product.shopId.toString() !== userShop._id.toString()) {
      error.message = "Forbidden: You are not the owner of this product";
      error.status = 403;
      throw error;
    }

    // Transfer the properties from the DTO to the product document
    Object.assign(product, data);

    // Save the updated product document
    await product.save();

    return product;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a product by its ID.
 * @param id The ID of the product to delete.
 * @param userId The ID of the user attempting to delete the product.
 * @returns A promise resolving to the deleted product document.
 */
export const deleteById = async (id: string, userId: string) => {
  let error = new Error() as any;
  try {
    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      error.message = "Product not found";
      error.status = 404;
      throw error;
    }

    // Check if the user is the owner of the product
    const userShop = await Shop.findOne({ userId });
    if (!userShop) {
      error.message = "Forbidden: You do not have a shop";
      error.status = 403;
      throw error;
    }

    // Check if the product belongs to the user's shop
    if (product.shopId.toString() !== userShop._id.toString()) {
      error.message = "Forbidden: You are not the owner of this product";
      error.status = 403;
      throw error;
    }

    // If all checks pass, delete the product
    return product.deleteOne();
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves a product by its ID.
 * @param id The ID of the product to retrieve.
 * @returns A promise resolving to the product document.
 */
export const getById = async (id: string): Promise<ProductDocument> => {
  try {
    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not found") as any;
      error.status = 404;
      throw error;
    }

    // If the product exists, return it
    return product;
  } catch (error) {
    throw error;
  }
};
