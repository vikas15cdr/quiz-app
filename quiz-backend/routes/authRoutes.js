// FILE: routes/authRoutes.js

import express from 'express';
// Import the specific controller functions
import { registerUser, loginUser, getCurrentUser } from '../controllers/userController.js'; 
// Import the correct middleware
import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route - requires a valid token to access
// This is where you use the 'protect' middleware
router.get('/me', protect, getCurrentUser);

export { router as authRoutes };