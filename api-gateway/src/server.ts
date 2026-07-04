import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import authenticate from "./middleware/auth.middleware.js";

// Load environment variables from .env file
dotenv.config();

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:3001";

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";

const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:3003";

const CART_SERVICE_URL =
  process.env.CART_SERVICE_URL || "http://localhost:3004";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Cookie parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "api-gateway" });
});

// Helper to forward the authenticated user's info to downstream services
const attachUserHeader = (proxyReq: any, req: Request) => {
  if ((req as any).user) {
    proxyReq.setHeader("x-user", JSON.stringify((req as any).user));
  }
};

// Auth service proxy configuration
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/auth${path}`,
  }),
);

// Product service proxy configuration
app.use(
  "/api/products",
  authenticate,
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/products${path}`,
    on: {
      proxyReq: attachUserHeader,
    },
  }),
);

// Shop service proxy configuration (Same as product service for now)
app.use(
  "/api/shops",
  authenticate,
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/shops${path}`,
    on: {
      proxyReq: attachUserHeader,
    },
  }),
);

// Order service proxy configuration
app.use(
  "/api/orders",
  authenticate,
  createProxyMiddleware({
    target: ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/orders${path}`,
    on: {
      proxyReq: attachUserHeader,
    },
  }),
);

// Cart service proxy configuration
app.use(
  "/api/carts",
  authenticate,
  createProxyMiddleware({
    target: CART_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/api/carts${path}`,
    on: {
      proxyReq: attachUserHeader,
    },
  }),
);

// Add a catch-all 404 handler so unmapped paths don't hang
app.use((req: Request, res: Response) => {
  if (res.headersSent) return;
  res
    .status(404)
    .json({ error: "Not Found", message: "Route does not exist on Gateway" });
});

// If a microservice goes down, this stops the gateway from crashing and sends a proper 502
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("API Gateway Intercepted Error:", err.message);
  if (res.headersSent) {
    return next(err);
  }
  res.status(502).json({
    error: "Bad Gateway",
    message: "The downstream destination service is currently unreachable.",
  });
});

// Start the API Gateway server
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});