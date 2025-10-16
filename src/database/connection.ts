import mongoose from "mongoose";
import config from "../config/config";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI!);
        console.info("🍀🍀🍀🍀🍀🍀🍀🍀 DATABASE CONNECTED 🍀🍀🍀🍀🍀🍀🍀🍀");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};