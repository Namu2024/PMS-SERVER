<<<<<<< HEAD
import express from 'express';
import { login, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Correct import

const router = express.Router();

// Login route
router.post('/login', login);

// Verify route, protected with authMiddleware
router.get('/verify', authMiddleware, verify);
=======
import express from "express";
import { login, verify } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/verify", authMiddleware, verify);
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55

export default router;
