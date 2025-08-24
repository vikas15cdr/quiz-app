import { Router } from 'express';
import {
  createQuiz,
  getAllPublishedQuizzes, // Make sure this is imported
  getQuizById,
  getQuizForEditing,
  updateQuiz,
  deleteQuiz,
  submitQuizAnswer,
getQuizzesForStudent
} from '../controllers/quizController.js';
import { protect, isTeacher, isStudent } from '../middlewares/authMiddleware.js'; 

const router = Router();

// Public
router.get('/', getAllPublishedQuizzes);

// Student (must come before /:id to avoid conflicts)
router.get('/student', protect, isStudent, getQuizzesForStudent);
router.post('/:id/submit', protect, isStudent, submitQuizAnswer);

// Public (specific routes with parameters should come after specific named routes)
router.get('/:id', getQuizById);

// Teacher
router.post('/', protect, isTeacher, createQuiz);
router.put('/:id', protect, isTeacher, updateQuiz);
router.delete('/:id', protect, isTeacher, deleteQuiz);
router.get('/edit/:id', protect, isTeacher, getQuizForEditing);


export { router as quizRoutes };

