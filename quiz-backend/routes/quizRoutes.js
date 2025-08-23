import { Router } from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizForEditing, // Import the new function
  updateQuiz,
  deleteQuiz,
  submitQuizAnswer
} from '../controllers/quizController.js';
import { protect, isTeacher, isStudent } from '../middlewares/authMiddleware.js'; 

const router = Router();

// --- Public Route ---
router.get('/:id', getQuizById); // For students to view a published quiz

// --- Teacher-Only Routes ---
router.post('/', protect, isTeacher, createQuiz); 
router.put('/:id', protect, isTeacher, updateQuiz); 
router.delete('/:id', protect, isTeacher, deleteQuiz);

// --- NEW ROUTE ---
// Secure route for a teacher to fetch their own quiz (draft or published) for editing
router.get('/edit/:id', protect, isTeacher, getQuizForEditing);

// --- Student-Only Route ---
router.post('/:id/submit', protect, isStudent, submitQuizAnswer);

export { router as quizRoutes };