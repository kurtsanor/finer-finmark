import { Shop } from "../shops/shop.model.js";
import { Product } from "./product.model.js";
import type { CreateProductDto, ProductDocument } from "./product.types.js";

export const create = async (
  data: CreateProductDto,
): Promise<ProductDocument> => {
  // Check if the shop exists before creating the product
  const shop = await Shop.findById(data.shopId);
  if (!shop) {
    const error = new Error("Shop not found") as any;
    error.status = 404;
    throw error;
  }

  // Create the product
  const product = await Product.create(data);

  return product;
};
