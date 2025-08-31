import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(chalk.green.bold("✅ MongoDB Connected"));
  } catch (error) {
    console.log(chalk.red.bold("❌ MongoDB Connection Error: "), error.message);
    process.exit(1);
  }
};
