import { model, Schema } from "mongoose";

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
