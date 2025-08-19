import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  getCurrentUser 
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (requires JWT)
router.get('/me', authMiddleware, getCurrentUser);

export { router as authRoutes };  // Named export