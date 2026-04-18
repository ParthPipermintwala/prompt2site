import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "prompt2siteDB" });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});
