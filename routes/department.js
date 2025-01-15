import express from "express";
import {
  addDepartment,
  getDepartments,
  getDepartment,
  editDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.post("/", addDepartment);
router.get("/", getDepartments);
router.get("/:id", getDepartment);
router.put("/:id", editDepartment);
router.delete("/:id", deleteDepartment);

export default router;
