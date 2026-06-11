import type { Document, Types } from "mongoose";

export type ProductDocument = Document & {
  name: string;
  description: string;
  price: number;
  shopId: Types.ObjectId;
  imageUrl?: string | null;
};

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  shopId: Types.ObjectId;
  imageUrl?: string | null;
};
