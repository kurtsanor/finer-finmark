import { model, Schema } from "mongoose";

/**
 * Product model schema.
 */
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    price: { type: Number, required: true },
    shopId: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
  },
  { timestamps: true },
);

export const Product = model("Product", productSchema);
