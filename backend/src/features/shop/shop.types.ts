import type { Document, Types } from "mongoose";

export type ShopDocument = Document & {
  name: string;
  description: string;
  userId: Types.ObjectId;
};

export type CreateShopDto = {
  name: string;
  description: string;
  userId: Types.ObjectId;
};
