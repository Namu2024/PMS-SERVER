// controllers/salesController.js
import Sales from "../models/salesModel.js";

// Get all sales entries
export const getSales = async (req, res) => {
  try {
    const salesEntries = await Sales.find(); // Get all sales from DB
    res.json(salesEntries); // Return the sales entries
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales entries" });
  }
};

// Create a new sales entry
export const createSalesEntry = async (req, res) => {
  try {
    const newSalesEntry = new Sales(req.body); // Create a new sales entry
    await newSalesEntry.save(); // Save it to DB
    res.status(201).json(newSalesEntry); // Return the created sales entry
  } catch (error) {
    res.status(500).json({ message: "Error creating sales entry" });
  }
};
