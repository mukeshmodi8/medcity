import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/medcity";

async function connectDB() {
  if (!MONGO_URI) {
    console.error("MONGO_URI Not Found — please chack .env file");
    process.exit(1);
  }

  try {
   
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message || err);
    process.exit(1);
  }
}

export default connectDB;
