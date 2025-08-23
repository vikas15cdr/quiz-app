import Quiz from '../models/Quiz.js';
import Result from '../models/Result.js';
import { API_ERRORS } from '../config/constants.js';
import { sendSuccessResponse, sendErrorResponse } from '../utils/apiResponse.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({
      ...req.body,
      createdBy: req.user._id
    });
    sendSuccessResponse(res, 201, quiz.toObject());
  } catch (err) {
    console.error("--- QUIZ CREATION ERROR ---", err); 
    sendErrorResponse(res, 400, err.message);
  }
};

// Get all published quizzes with pagination
export const getAllQuizzes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const [quizzes, total] = await Promise.all([
      Quiz.find({ isPublished: true })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('createdBy', 'name'),
      Quiz.countDocuments({ isPublished: true })
    ]);
    sendSuccessResponse(res, 200, {
      quizzes,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    sendErrorResponse(res, 500, API_ERRORS.SERVER_ERROR);
  }
};

// Get a single quiz by ID (for students/public view)
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'name');
    if (!quiz || !quiz.isPublished) {
      return sendErrorResponse(res, 404, API_ERRORS.QUIZ_NOT_FOUND);
    }
    sendSuccessResponse(res, 200, quiz.toObject());
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
};

// --- THIS FUNCTION WAS MISSING ---
// Get a quiz for editing (for the teacher who created it)
export const getQuizForEditing = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      createdBy: req.user._id // Ensures only the creator can fetch it
    });

    if (!quiz) {
      return sendErrorResponse(res, 404, API_ERRORS.QUIZ_NOT_FOUND);
    }
    // No 'isPublished' check here, so teachers can edit drafts
    sendSuccessResponse(res, 200, quiz.toObject());
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
};

// Update quiz (only by creator)
export const updateQuiz = async (req, res) => {
  try {
    // FIX 1: Whitelist all editable fields to ensure they are saved.
    const { title, description, category, questions, isPublished } = req.body;
    const updateData = { title, description, category, questions, isPublished };

    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return sendErrorResponse(res, 404, API_ERRORS.QUIZ_NOT_FOUND);
    }

    // FIX 2: Convert the Mongoose document to a plain object before sending the response.
    sendSuccessResponse(res, 200, quiz.toObject());
  } catch (err) {
    console.error("--- QUIZ UPDATE ERROR ---", err);
    sendErrorResponse(res, 400, err.message);
  }
};

// Delete quiz (only by creator)
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!quiz) {
      return sendErrorResponse(res, 404, API_ERRORS.QUIZ_NOT_FOUND);
    }

    sendSuccessResponse(res, 200, { message: 'Quiz deleted successfully' });
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
};

// Submit quiz answers (student only)
export const submitQuizAnswer = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz || !quiz.isPublished) {
      return sendErrorResponse(res, 404, API_ERRORS.QUIZ_NOT_FOUND);
    }

    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return sendErrorResponse(res, 400, 'Answers must be an array.');
    }

    // --- NEW LOGIC ---
    // Check if the student has already taken this quiz
    const existingResult = await Result.findOne({ quiz: req.params.id, student: req.user._id });
    if (existingResult) {
      return sendErrorResponse(res, 400, 'You have already attempted this quiz.');
    }

    const score = calculateScore(quiz, answers);

    // Save the new result to the database
    await Result.create({
      quiz: req.params.id,
      student: req.user._id,
      score,
      answers
    });

    sendSuccessResponse(res, 200, {
      score,
      message: 'Quiz submitted successfully!'
    });
  } catch (err) {
    // Provide more specific error feedback if it's a duplicate attempt
    if (err.code === 11000) {
      return sendErrorResponse(res, 400, 'You have already attempted this quiz.');
    }
    sendErrorResponse(res, 400, err.message);
  }
};

// Helper: Calculate score
const calculateScore = (quiz, userAnswers) => {
  let correct = 0;
  quiz.questions.forEach((question, index) => {
    if (userAnswers && userAnswers[index] === question.correctAnswer) {
      correct++;
    }
  });

  if (!quiz.questions.length) return 0;
  return (correct / quiz.questions.length) * 100;
};
