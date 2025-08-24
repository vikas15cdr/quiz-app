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
router.get('/:id', getQuizById);

// Student
router.get('/student', protect, isStudent, getQuizzesForStudent);
router.post('/:id/submit', protect, isStudent, submitQuizAnswer);

// Teacher
router.post('/', protect, isTeacher, createQuiz);
router.put('/:id', protect, isTeacher, updateQuiz);
router.delete('/:id', protect, isTeacher, deleteQuiz);
router.get('/edit/:id', protect, isTeacher, getQuizForEditing);


export { router as quizRoutes };

