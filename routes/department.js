import express from "express";
import {
  getDepartment,
  editDepartment,
  getDepartments,
  addDepartment,deleteDepartment
} from "../controllers/departmentController.js";

const router = express.Router();

// Get all departments
router.get("/", getDepartments);

// Add a new department
router.post("/", addDepartment);

// Get a single department by ID
router.get("/:id", getDepartment);

// Edit an existing department
router.put("/:id", editDepartment);
router.delete("/:id", deleteDepartment);

export default router;
