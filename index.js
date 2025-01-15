import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
<<<<<<< HEAD
import salesRoutes from "./routes/salesRoutes.js";
import authRoutes from "./routes/auth.js";
import department from "./routes/department.js"; // Corrected path and variable name
import Employee from "./models/Employee.js";

dotenv.config(); // Load environment variables

connectToDatabase(); // Connect to the database
=======
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/Employee.js";

dotenv.config(); // Load environment variables from .env file

// Connect to the database
connectToDatabase();
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55

const app = express();

// Middleware setup
<<<<<<< HEAD
app.use(cors());
app.use(express.json());

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/department", department); // Corrected usage
app.use("/api/Employee", Employee); // Corrected usage

const PORT = process.env.PORT || 5000;
=======
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use("/public/uploads", express.static("uploads")); // Serve uploaded files statically from 'uploads' directory

// Routes setup
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/department", departmentRouter); // Department routes
app.use("/api/employee", employeeRouter); // Employee routes

const PORT = process.env.PORT || 5000; // Use environment variable for port, fallback to 5000
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
