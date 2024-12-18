import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const dbURI = process.env.MONGODB_URL;

    // Ensure dbURI is defined in the environment variables
    if (!dbURI) {
      throw new Error("MongoDB URI is not defined in the environment variables.");
    }

    // Connect to MongoDB
    await mongoose.connect(dbURI, {
      // Options are no longer necessary but kept for explicitness
      // These options are default in recent Mongoose versions
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    // Log the error message to understand what went wrong
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDatabase;
