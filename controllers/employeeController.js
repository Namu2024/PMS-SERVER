import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Department.js";

// ... (multer setup - no changes needed)

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// ... (validation rules - no changes needed)

const addEmployee = asyncHandler(async (req, res) => {
    // ... (add employee logic - no changes needed)
});

const getEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId", "-password") // More concise way to exclude password
            .populate("department");

        if (!employees || employees.length === 0) { // Check for null or empty
            return res.status(404).json({ success: false, error: "No employees found" });
        }

        res.status(200).json({ success: true, employees });
    } catch (err) {
        console.error("Error getting employees:", err); // Log full error
        res.status(500).json({ success: false, error: "Server error" }); // Generic message for user
    }
});

// ... (other controller functions - minor changes for error handling)
const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        await User.findByIdAndDelete(employee.userId);
        res.status(200).json({ success: true, message: "Employee deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ success: false, error: "Server error during deletion" });
    }
});

export {
    addEmployee,
    upload,
    getEmployees,
    getEmployee,
    updateEmployee,
    fetchEmployeesByDepId,
    deleteEmployee,
};