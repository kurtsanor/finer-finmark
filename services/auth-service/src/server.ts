import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db.js";
import authRoutes from "./features/auth/auth.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3001;

// GLOBAL MIDDLEWARE
app.use(cookieParser()); // Parses cookies from incoming requests
app.use(express.json()); // Parses incoming JSON payloads

// Used by Docker Compose or Kubernetes to verify the service is running
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", service: "auth-service" });
});

// MOUNT FEATURE ROUTES
// Mounts all login, register, and /me endpoints under the base prefix
app.use("/api/auth", authRoutes);

// CENTRALIZED ERROR HANDLING MIDDLEWARE
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Auth Service Error]: ${err.message}`);

  res.status((err.status as number) || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Ensure the database connection is established before starting the server
await connectToDatabase();

// START SERVER
app.listen(PORT, () => {
  console.log(`Auth Service listening securely on port ${PORT}`);
});
