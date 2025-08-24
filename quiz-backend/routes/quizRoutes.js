import { Router } from 'express';
import {
  createQuiz,
  getAllQuizzes, // Make sure this is imported
  getQuizById,
  getQuizForEditing,
  updateQuiz,
  deleteQuiz,
  submitQuizAnswer
} from '../controllers/quizController.js';
import { protect, isTeacher, isStudent } from '../middlewares/authMiddleware.js'; 

const router = Router();

// --- THIS ROUTE WAS MISSING ---
// Public route to get all published quizzes
router.get('/', getAllQuizzes); 

// --- Public Route for a single quiz ---
router.get('/:id', getQuizById); // For students to view a published quiz

// --- Teacher-Only Routes ---
router.post('/', protect, isTeacher, createQuiz); 
router.put('/:id', protect, isTeacher, updateQuiz); 
router.delete('/:id', protect, isTeacher, deleteQuiz);
router.get('/edit/:id', protect, isTeacher, getQuizForEditing);
router.get('/:id', getQuizById);

// --- Student-Only Route ---
router.post('/:id/submit', protect, isStudent, submitQuizAnswer);

export { router as quizRoutes };