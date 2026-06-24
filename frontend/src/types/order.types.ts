import type { CountryCode } from "../constants/seaCountries";

export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered";

export type OrderItemSnapshot = {
  product: {
    name: string;
    price: string;
    _id: string;
    imageUrl: string | null;
  };
  name: string;
  price: number;
  quantity: number;
};

export type Shop = {
  _id: string;
  name: string;
};

export type ShopOrder = {
  _id: string;
  shopId: Shop;
  status: OrderStatus;
  subtotal: number;
  items: OrderItemSnapshot[];
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  country: CountryCode;
  postalCode: string;
  phoneNumber: string;
};

export type Order = {
  _id: string;
  buyerId: string;
  shopOrders: ShopOrder[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
};
