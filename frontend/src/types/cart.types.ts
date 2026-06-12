import type { Product } from "./product.types";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartItemDto = {
  quantity: number;
  productId: Product & {
    _id: string;
    shopId: {
      name: string;
    };
  };
};
