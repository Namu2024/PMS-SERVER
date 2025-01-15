import express from 'express';
import { login, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Correct import

const router = express.Router();

// Login route
router.post('/login', login);

// Verify route, protected with authMiddleware
router.get('/verify', authMiddleware, verify);

export default router;
