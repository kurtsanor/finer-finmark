import { model, Schema } from "mongoose";

/**
 * Cart model schema.
 */
const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true },
);

export const Cart = model("Cart", cartSchema);

/**
 * Product model schema.
 */
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    shopId: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
  },
  { timestamps: true },
);

export const Product = model("Product", productSchema);

/**
 * Shop model schema.
 */
const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

shopSchema.index({ name: 1 }, { unique: true });

export const Shop = model("Shop", shopSchema);
