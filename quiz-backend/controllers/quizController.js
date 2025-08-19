import Quiz from '../models/Quiz.js';
import { API_ERRORS } from '../config/constants.js';
import { sendSuccessResponse, sendErrorResponse } from '../utils/apiResponse.js';

// Create a new quiz (Admin only)
export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({
      ...req.body,
      createdBy: req.user._id
    });
    sendSuccessResponse(res, 201, quiz);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

// Get all quizzes (with pagination)
export const getAllQuizzes = async (req, res) => {
  try {
    const page1 = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const quizzes = await Quiz.find()
      .skip((page1 - 1) * limit)
      .limit(limit)
      .populate('createdBy', 'email');
      
    sendSuccessResponse(res, 200, quizzes);
  } catch (err) {
    sendErrorResponse(res, 500, API_ERRORS.SERVER_ERROR);
  }
};

// Get single quiz
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'email');
      
    if (!quiz) {
      return sendErrorResponse(res, 404, API_ERRORS.QUIZ_NOT_FOUND);
    }
    sendSuccessResponse(res, 200, quiz);
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
};

// Update quiz (Admin/owner only)
export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!quiz) {
      return sendErrorResponse(res, 403, API_ERRORS.FORBIDDEN);
    }
    sendSuccessResponse(res, 200, quiz);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

// Delete quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!quiz) {
      return sendErrorResponse(res, 403, API_ERRORS.FORBIDDEN);
    }
    sendSuccessResponse(res, 200, { message: 'Quiz deleted' });
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
};

// Submit quiz answers
export const submitQuizAnswer = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return sendErrorResponse(res, 404, API_ERRORS.QUIZ_NOT_FOUND);
    }

    const score = calculateScore(quiz, req.body.answers);
    sendSuccessResponse(res, 200, { score });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

// Helper function
const calculateScore = (quiz, userAnswers) => {
  let correct = 0;
  quiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correct++;
    }
  });
  return (correct / quiz.questions.length) * 100;
};