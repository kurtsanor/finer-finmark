export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | null;
};

export type UpdateProductDto = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | null;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  category: string;
  createdAt: string;
  shopId: {
    _id: string;
    name: string;
  };
};

export type PaginatedProductsResponse = {
  message: string;
  data: {
    data: Product[];
    page: number;
    totalPages: number;
    count: number;
  };
};
