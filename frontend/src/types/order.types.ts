export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered";

export type OrderItemSnapshot = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    shopId: string;
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
    items: OrderItemSnapshot[];
    shippingAddress: ShippingAddress;
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
};
