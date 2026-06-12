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
  userId: Types.ObjectId;
  imageUrl?: string | null;
};

export type ProductDto = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  createdAt: Date;
  shopId: {
    _id: Types.ObjectId;
    name: string;
  };
};
