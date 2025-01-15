import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
=======
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
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55
  }
};

export default connectToDatabase;
