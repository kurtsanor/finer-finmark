import axiosInstance from "../utils/axiosInstance";
import type { ShippingAddress } from "../types/order.types";

export const createOrder = async (shippingAddress: ShippingAddress) => {
    const response = await axiosInstance.post("/api/orders", { shippingAddress });
    return response.data;
}

export const getMyOrders = async () => {
    const response = await axiosInstance.get("/api/orders/my-orders");
    return response.data;
}
export const getSellerOrders = async () => {
    const response = await axiosInstance.get("/api/orders/seller");
    return response.data;
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await axiosInstance.patch(`/api/orders/${orderId}/status`, { status });
    return response.data;
}

