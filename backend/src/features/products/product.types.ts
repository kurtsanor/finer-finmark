import type { Document, Types } from "mongoose";

export type ProductDocument = Document & {
  name: string;
  description: string;
  price: number;
  shopId: Types.ObjectId;
  category: string;
  imageUrl?: string | null;
};

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  category: string;
  userId: Types.ObjectId;
  imageUrl?: string | null;
};

export type UpdateProductDto = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string | null;
};

export type ProductDto = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | null;
  createdAt: Date;
  shopId: {
    _id: Types.ObjectId;
    name: string;
  };
};
