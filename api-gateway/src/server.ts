import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
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

// Auth service proxy configuration
app.use(
  "/api/auth",

  proxy(AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/auth${req.url}`,
  }),
);

// Product service proxy configuration
app.use(
  "/api/products",
  authenticate,
  proxy(PRODUCT_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/products${req.url}`,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Forward the user information from the request to the auth service
      if (srcReq.user) {
        proxyReqOpts.headers["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
  }),
);

// Shop service proxy configuration (Same as product service for now)
app.use(
  "/api/shops",
  authenticate,
  proxy(PRODUCT_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/shops${req.url}`,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Forward the user information from the request to the auth service
      if (srcReq.user) {
        proxyReqOpts.headers["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
  }),
);

// Order service proxy configuration
app.use(
  "/api/orders",
  authenticate,
  proxy(ORDER_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/orders${req.url}`,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Forward the user information from the request to the auth service
      if (srcReq.user) {
        proxyReqOpts.headers["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
  }),
);

// Cart service proxy configuration
app.use(
  "/api/carts",
  authenticate,
  proxy(CART_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/carts${req.url}`,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Forward the user information from the request to the auth service
      if (srcReq.user) {
        proxyReqOpts.headers["x-user"] = JSON.stringify(srcReq.user);
      }
      return proxyReqOpts;
    },
  }),
);

// Add a catch-all 404 handler so unmapped paths don't hang
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: "Not Found", message: "Route does not exist on Gateway" });
});

// If a microservice goes down, this stops the gateway from crashing and sends a proper 502
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("API Gateway Intercepted Error:", err.message);
  res.status(502).json({
    error: "Bad Gateway",
    message: "The downstream destination service is currently unreachable.",
  });
});

// Start the API Gateway server
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
