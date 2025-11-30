import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("Error: MONGO_URI not found in .env file!");
      process.exit(1);
    }

    console.log("⏳ Connecting to MongoDB...");
    // remove deprecated options
    await mongoose.connect(uri, {
      dbName: "MERN",
    });

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default dbConnection;