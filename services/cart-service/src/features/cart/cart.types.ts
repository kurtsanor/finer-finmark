export type CartDto = {
  userId: string;
  items: CartItem[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};
