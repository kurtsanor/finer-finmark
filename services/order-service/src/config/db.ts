import mongoose from "mongoose";

/**
 * Open the MongoDB connection used by the backend services.
 *
 * @returns A promise that resolves when the connection is established.
 * @throws If MongoDB cannot be reached or the connection fails.
 */
const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/finmark",
    );
    console.log("Order Service - Connected to MongoDB");
  } catch (error) {
    console.error("Order Service - Failed to connect to MongoDB");
    throw error;
  }
};

export default connectToDatabase;
