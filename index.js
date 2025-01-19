import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import salesRoutes from "./routes/salesRoutes.js";
import authRoutes from "./routes/auth.js";
import department from "./routes/department.js"; // Corrected path and variable name
import Employee from "./models/Employee.js";

dotenv.config(); // Load environment variables

connectToDatabase(); // Connect to the database

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/department", department); // Corrected usage
app.use("/api/Employee", Employee); // Corrected usage

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
