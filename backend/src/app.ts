import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./features/auth/auth.routes.js";
import connectToDatabase from "./config/db.js";
import { authenticate } from "./middlewares/authMiddleware.js";
import shopRoutes from "./features/shop/shop.routes.js";
import productRoutes from "./features/product/product.routes.js";
import cartRoutes from "./features/cart/cart.routes.js";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

/*
 * Centralized error handler keeps API responses consistent.
 */
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(error);
    const statusCode = error?.status || 500;
    res
      .status(statusCode)
      .json({ error: error?.message || "Internal Server Error" });
  },
);

// Routes
app.get("/api/health", authenticate, (req, res) => {
  res.json({ status: "ok" });
});

await connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
