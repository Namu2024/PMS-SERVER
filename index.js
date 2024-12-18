import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/Employee.js";

dotenv.config(); // Load environment variables from .env file

// Connect to the database
connectToDatabase();

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use("/public/uploads", express.static("uploads")); // Serve uploaded files statically from 'uploads' directory

// Routes setup
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/department", departmentRouter); // Department routes
app.use("/api/employee", employeeRouter); // Employee routes

const PORT = process.env.PORT || 5000; // Use environment variable for port, fallback to 5000

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
