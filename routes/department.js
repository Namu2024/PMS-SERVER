import express from "express";
import {
<<<<<<< HEAD
  addDepartment,
  getDepartments,
  getDepartment,
  editDepartment,
  deleteDepartment,
=======
  getDepartment,
  editDepartment,
  getDepartments,
  addDepartment,deleteDepartment
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55
} from "../controllers/departmentController.js";

const router = express.Router();

<<<<<<< HEAD
router.post("/", addDepartment);
router.get("/", getDepartments);
router.get("/:id", getDepartment);
=======
// Get all departments
router.get("/", getDepartments);

// Add a new department
router.post("/", addDepartment);

// Get a single department by ID
router.get("/:id", getDepartment);

// Edit an existing department
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55
router.put("/:id", editDepartment);
router.delete("/:id", deleteDepartment);

export default router;
