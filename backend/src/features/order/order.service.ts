import { Cart } from "../cart/cart.model.js";
import { Product } from "../product/product.model.js";
import { Shop } from "../shop/shop.model.js";
import { Order } from "./order.model.js";
import type { CreateOrderRequest, OrderStatus, UpdateOrderStatusRequest } from "./order.types.js";

export const createOrder = async (
    buyerId: string,
    data: CreateOrderRequest,
    ) => {
  const cart = await Cart.findOne({ buyerId }).populate("items.productId");

  const cartDoc = await Cart.findOne({ buyerId });
  if (!cartDoc || cartDoc.items.length === 0) {
    const error = new Error("Your cart is empty") as any;
    error.status = 400;
    throw error; }
    
    //Build items snapshots with current prices

    const itemSnapshots = [];
    let totalAmount = 0;

    for (const item of cartDoc.items) {
        const product = await Product.findById(item.productId).lean();
        if (!product) {
            const error = new Error(`Product not found: ${item.productId}`) as any;
            error.status = 404;
            throw error;
        }

        const shop = await Shop.findById(product.shopId).lean();
        if (!shop) {
            const error = new Error(`Shop not found for product: ${product._id}`) as any;
            error.status = 404;
            throw error;
        }

        itemSnapshots.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            shopId: shop._id,
        });

       totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({ 
        buyerId, 
        items: itemSnapshots, 
        shippingAddress: data.shippingAddress,
        totalAmount,
        status: "placed",
    });

    cartDoc.items = [] as any;
    await cartDoc.save();

    return order;
};

/**
 * 
 * Returns all oorders for the authenticated buyer.
 */
export const getBuyerOrders = async (buyerId: string) => {
    return Order.find({ buyerId }).sort({ createdAt: -1 }).lean();
};

/**
 * Returns all orders that contain at least one item from the seller's shop.
 */

export const getSellerOrders = async (sellerId: string) => {
    const shop = await Shop.findOne({ userId: sellerId }).lean();
    if(!shop){
        const error = new Error("You do not have a shop") as any;
        error.status = 404;
        throw error;
    }

    return Order.find({ "items.shopId": shop._id })
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * Updates the status of an order. Only the seller whose shop is in the order may update it.
 */

export const updateOrderStatus = async (
    orderId: string, 
    sellerId: string, 
    data: UpdateOrderStatusRequest,
) => {
    const shop = await Shop.findOne({ userId: sellerId }).lean();
    if (!shop) {
        const error = new Error("You do not have a shop") as any;
        error.status = 404;
        throw error;
    }

    const order = await Order.findOne({ _id: orderId });
        if (!order) {
            const error = new Error("Order not found") as any;
            error.status = 404;
            throw error;
        }
    
        const ownsItem = order.items.some(
            (item) => item.shopId.toString() === (shop._id as any).toString());
            if(!ownsItem){
                const error = new Error("You do not have permission to update this order") as any;
                error.status = 403;
                throw error;
            }

            order.status = data.status;
            await order.save();

            return order;
};












