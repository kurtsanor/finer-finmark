export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  createdAt: string;
  shopId: {
    _id: string;
    name: string;
  };
};
