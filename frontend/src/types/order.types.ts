export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered";

export type OrderItemSnapshot = {
  product: string;
  name: string;
  price: number;
  quantity: number;
};

export type Shop = {
  _id: string;
  name: string;
};

export type ShopOrder = {
  shopId: Shop;
  status: OrderStatus;
  subtotal: number;
  items: OrderItemSnapshot[];
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
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
