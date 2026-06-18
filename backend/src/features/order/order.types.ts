import type { Document, Types } from "mongoose";
import type { CountryCode } from "../../constants/seaCountries.js";

export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered";

export type OrderItemSnapshot = {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    shopId: Types.ObjectId;
};

export type ShippingAddress = {
    fullName: string;
    address: string;
    city: string;
    country: CountryCode;
    postalCode: string;
    phoneNumber: string;
};

export type OrderDocument = Document & {
    buyerId: Types.ObjectId;
    items: OrderItemSnapshot[];
    shippingAddress: ShippingAddress;
    status: OrderStatus;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateOrderRequest = {
    shippingAddress: ShippingAddress;
};

export type UpdateOrderStatusRequest = {
    status: OrderStatus;
};