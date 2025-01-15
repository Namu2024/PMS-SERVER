import express from "express";
import {
    addEmployee,
    upload,
    getEmployees,
    getEmployee,
    updateEmployee,
    fetchEmployeesByDepId,
    deleteEmployee, // Import delete function
} from "./controllers/employeeController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getEmployees);
router.post('/add', authMiddleware, upload.single('image'), addEmployee);
router.get('/:id', authMiddleware, getEmployee);
router.put('/:id', authMiddleware, updateEmployee);
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId);
router.delete('/:id', authMiddleware, deleteEmployee); // Add delete route with auth middleware

export default router;