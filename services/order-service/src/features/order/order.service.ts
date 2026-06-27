import { Order } from "./order.model.js";
import type {
  CreateOrderRequest,
  UpdateOrderStatusRequest,
} from "./order.types.js";

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";
const CART_SERVICE_URL =
  process.env.CART_SERVICE_URL || "http://localhost:3004";

/**
 * Creates a new order for the authenticated buyer.
 * It retrieves the buyer's cart, groups items by shop, calculates subtotals and total amount, creates the order, and clears the cart.
 *
 * @param buyerId The ID of the authenticated buyer placing the order.
 * @param data The request body containing the shipping address.
 * @returns The created order document.
 */
export const createOrder = async (
  buyerId: string,
  data: CreateOrderRequest,
) => {
  // Check if the buyer has a cart and if it contains items
  // const cartDoc = await Cart.findOne({ userId: buyerId });

  const cartDoc = await fetch(`${CART_SERVICE_URL}/api/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user": JSON.stringify({ userId: buyerId }), // Pass the userId in the headers
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);

  console.log("Cartdoc: ", cartDoc);

  if (!cartDoc || cartDoc.items.length === 0) {
    const error = new Error("Your cart is empty") as any;
    error.status = 400;
    throw error;
  }

  // Group items by shop and calculate subtotals and total amount
  const shopOrdersMap = new Map();

  let totalAmount = 0;

  // Iterate through each item in the cart
  for (const item of cartDoc.items) {
    // Fetch the product details from the database
    // const product = await Product.findById(item.productId).lean();
    const product = await fetch(
      `${PRODUCT_SERVICE_URL}/api/products/${item.productId._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify({ userId: buyerId }), // Pass the userId in the headers
        },
      },
    )
      .then((res) => res.json())
      .then((data) => data.data);

    if (!product) {
      const error = new Error(
        `Product not found: ${item.productId._id}`,
      ) as any;
      error.status = 404;
      throw error;
    }
    // Fetch the shop details for the product
    const shop = await fetch(
      `${PRODUCT_SERVICE_URL}/api/shops/${product.shopId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-user": JSON.stringify({ userId: buyerId }), // Pass the userId in the headers
        },
      },
    )
      .then((res) => res.json())
      .then((data) => data.data);

    if (!shop) {
      const error = new Error(
        `Shop not found for product: ${product._id}`,
      ) as any;
      error.status = 404;
      throw error;
    }

    const shopId = shop._id.toString();

    // If this is the first item from this shop, initialize a new shop order
    if (!shopOrdersMap.has(shopId)) {
      shopOrdersMap.set(shopId, {
        shopId: shop._id,
        status: "placed",
        subtotal: 0,
        items: [],
      });
    }

    // Add the item to the corresponding shop order and update the subtotal and total amount
    const shopOrder = shopOrdersMap.get(shopId);

    // Calculate the line total for this item
    const lineTotal = Number(product.price) * item.quantity;

    // Add the item to the shop order's items array
    shopOrder.items.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });

    // Update the subtotal for this shop order and the overall total amount
    shopOrder.subtotal += lineTotal;
    totalAmount += lineTotal;
  }

  // Create the order document in the database
  const order = await Order.create({
    buyerId,
    shopOrders: Array.from(shopOrdersMap.values()),
    shippingAddress: data.shippingAddress,
    totalAmount,
  });

  // Clear the buyer's cart after creating the order
  const clearCartResponse = await fetch(`${CART_SERVICE_URL}/api/carts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-user": JSON.stringify({ userId: buyerId }),
    },
  });

  return order;
};

/**
 * Returns all orders for the authenticated buyer.
 */
export const getBuyerOrders = async (buyerId: string) => {
  return Order.find({ buyerId })
    .populate({
      path: "shopOrders",
      populate: [
        {
          path: "shopId",
          select: "name",
        },
        {
          path: "items.product",
          select: "name price imageUrl",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();
};
/**
 * Returns all orders that contain the seller's shop.
 */
export const getSellerOrders = async (sellerId: string) => {
  // Get the shop associated with the seller
  const shop = await fetch(`${PRODUCT_SERVICE_URL}/api/shops/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user": JSON.stringify({ userId: sellerId }), // Pass the userId in the headers
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);

  console.log("Shop is: ", shop);

  if (!shop) {
    const error = new Error("You do not have a shop") as any;
    error.status = 404;
    throw error;
  }

  const orders = await Order.find({
    "shopOrders.shopId": shop._id,
  })
    .populate({
      path: "shopOrders",
      populate: [
        {
          path: "shopId",
          select: "name",
        },
        {
          path: "items.product",
          select: "name price imageUrl",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();

  return orders.map((order) => ({
    ...order,
    shopOrders: order.shopOrders.filter(
      (so: any) =>
        String(typeof so.shopId === "object" ? so.shopId._id : so.shopId) ===
        String(shop._id),
    ),
  }));
};

/**
 * Updates the status of the seller's portion of an order.
 */
export const updateOrderStatus = async (
  orderId: string,
  sellerId: string,
  data: UpdateOrderStatusRequest,
) => {
  // Get the shop associated with the seller
  const shop = await fetch(`${PRODUCT_SERVICE_URL}/api/shops/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user": JSON.stringify({ userId: sellerId }), // Pass the userId in the headers
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);

  if (!shop) {
    const error = new Error("You do not have a shop") as any;
    error.status = 404;
    throw error;
  }

  const order = await Order.findById(orderId);

  if (!order) {
    const error = new Error("Order not found") as any;
    error.status = 404;
    throw error;
  }

  const shopOrder = order.shopOrders.find(
    (so: any) => so.shopId.toString() === shop._id.toString(),
  );

  if (!shopOrder) {
    const error = new Error(
      "You do not have permission to update this order",
    ) as any;
    error.status = 403;
    throw error;
  }

  shopOrder.status = data.status;

  await order.save();

  return order;
};
