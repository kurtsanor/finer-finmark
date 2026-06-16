import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        { product: {  type: Schema.Types.ObjectId, ref: "Product",  required: true },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true, min: 1 },
          shopId: { type: Schema.Types.ObjectId, ref: "Shop", required: true }
        },],
    shippingAddress: { 
        fullName: { type: String, required: true },
        addressLine1: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    },
    status: {
      type: String,
      enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    totalAmount: { type: Number, required: true },  
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);