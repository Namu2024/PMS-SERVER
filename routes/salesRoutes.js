// routes/salesRoutes.js
import express from "express";
import { getSales, createSalesEntry } from "../controllers/salesController.js";

const router = express.Router();

// Get all sales entries
router.get("/", getSales);

// Create a new sales entry
router.post("/", createSalesEntry);

export default router;
