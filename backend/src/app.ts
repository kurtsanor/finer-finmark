import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./features/auth/auth.routes.js";
import { authenticate } from "./middlewares/authMiddleware.js";
import shopRoutes from "./features/shop/shop.routes.js";
import productRoutes from "./features/product/product.routes.js";
import cartRoutes from "./features/cart/cart.routes.js";
import orderRoutes from "./features/order/order.routes.js";

const app = express();

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

console.log("Registering auth routes...");
app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/health", authenticate, (req, res) => {
  res.json({ status: "ok" });
});

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    const statusCode = error?.status || 500;

    res
      .status(statusCode)
      .json({ error: error?.message || "Internal Server Error" });
  },
);

export default app;
