import mongoose from "mongoose";

/**
 * Open the MongoDB connection used by the backend services.
 * Retries with exponential backoff if the initial connection fails,
 * since Mongo may not be ready yet (e.g. during container startup).
 *
 * @returns A promise that resolves when the connection is established.
 * @throws If MongoDB cannot be reached after the maximum number of retries.
 */
const MAX_RETRIES = 10;
const INITIAL_DELAY_MS = 1000; // 1 second

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const connectToDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/finmark";

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(uri);
      console.log("Product Service - Connected to MongoDB");
      return;
    } catch (error) {
      const delay = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
      console.error(
        `Product Service - Failed to connect to MongoDB (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${delay}ms...`,
      );

      if (attempt === MAX_RETRIES) {
        console.error("Product Service - Giving up after max retries.");
        throw error;
      }

      await sleep(delay);
    }
  }
};

export default connectToDatabase;