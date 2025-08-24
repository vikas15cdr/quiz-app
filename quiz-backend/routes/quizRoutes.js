import { Router } from 'express';
import {
  createQuiz,
  getAllPublishedQuizzes,
  getQuizById,
  getQuizForEditing,
  updateQuiz,
  deleteQuiz,
  submitQuizAnswer,
  getQuizzesForStudent
} from '../controllers/quizController.js';
import { protect, isTeacher, isStudent } from '../middlewares/authMiddleware.js';

const router = Router();

// --- Student routes (specific paths) ---
router.get('/student', protect, isStudent, getQuizzesForStudent);
router.post('/:id/submit', protect, isStudent, submitQuizAnswer);

// --- Teacher routes (specific paths) ---
router.post('/', protect, isTeacher, createQuiz);
router.put('/:id', protect, isTeacher, updateQuiz);
router.delete('/:id', protect, isTeacher, deleteQuiz);
router.get('/edit/:id', protect, isTeacher, getQuizForEditing);

// --- Public routes (generic last) ---
router.get('/', getAllPublishedQuizzes);
router.get('/:id', getQuizById); // <-- KEEP THIS LAST

export { router as quizRoutes };
