import express from "express";
import { addEmployee, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId, deleteEmployee } from "./controllers/employeeController.js";

const router = express.Router();


router.get('/', authMiddleware, getEmployees)
router.post('/add', authMiddleware, upload.single('image'), addEmployee)
router.get('/:id', authMiddleware, getEmployee)
router.put('/:id', authMiddleware, updateEmployee)
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId)

export default router