import { Router } from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuizAnswer
} from '../controllers/quizController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateQuizInput } from '../middlewares/validationMiddleware.js';

const router = Router();

// Public routes (read-only)
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);

// Protected routes (require JWT)
router.post('/', authMiddleware, validateQuizInput, createQuiz);
router.put('/:id', authMiddleware, validateQuizInput, updateQuiz);
router.delete('/:id', authMiddleware, deleteQuiz);

// Quiz submission
router.post('/:id/submit', authMiddleware, submitQuizAnswer);

export { router as quizRoutes };