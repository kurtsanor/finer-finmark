import dotenv from "dotenv";
import app from "./app.js";
import connectToDatabase from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

await connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});