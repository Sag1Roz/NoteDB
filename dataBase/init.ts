import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDateBase() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
