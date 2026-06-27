import { model, Schema } from "mongoose";
import { COUNTRY_CODES } from "../../constants/seaCountries.js";

const orderSchema = new Schema(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shopOrders: [
      {
        shopId: {
          type: Schema.Types.ObjectId,
          ref: "Shop",
          required: true,
        },

        status: {
          type: String,
          enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
          default: "placed",
        },

        items: [
          {
            product: {
              type: Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            },

            name: {
              type: String,
              required: true,
            },

            price: {
              type: Number,
              required: true,
            },

            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
          },
        ],

        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, enum: COUNTRY_CODES, required: true },
      postalCode: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = model("Order", orderSchema);

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
