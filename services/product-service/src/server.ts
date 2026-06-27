import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db.js";
import productRoutes from "./features/product/product.routes.js";
import shopRoutes from "./features/shop/shop.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PRODUCT_SERVICE_PORT || 3002;

// GLOBAL MIDDLEWARE
app.use(express.json()); // Parses incoming JSON payloads

// Used by Docker Compose or Kubernetes to verify the service is running
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", service: "product-service" });
});

// MOUNT FEATURE ROUTES
app.use("/api/products", productRoutes);
app.use("/api/shops", shopRoutes); // For now, shops and products share the same routes

// CENTRALIZED ERROR HANDLING MIDDLEWARE
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Product Service Error]: ${err.message}`);

  res.status((err.status as number) || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Ensure the database connection is established before starting the server
await connectToDatabase();

// START SERVER
app.listen(PORT, () => {
  console.log(`Product Service listening securely on port ${PORT}`);
});
