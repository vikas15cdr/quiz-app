import User from '../models/User.js';
import Quiz from '../models/Quiz.js';     // Make sure Quiz model is imported
import Result from '../models/Result.js';   // Make sure Result model is imported
import { sendErrorResponse } from '../utils/apiResponse.js'; // Assuming you have this for errors

// @desc    Get student dashboard data
// @route   GET /api/dashboards/student
// @access  Private/Student
export const getStudentDashboard = async (req, res) => {
  try {
    // Find all results for the logged-in student
    const results = await Result.find({ student: req.user._id })
      .populate('quiz', 'title category') // Get quiz title and category
      .sort({ createdAt: -1 }); // Show most recent first

    res.json({
      message: 'Welcome to the student dashboard!',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      results: results // Send the results to the frontend
    });
  } catch (error) {
     console.error("--- STUDENT DASHBOARD ERROR ---", error);
     sendErrorResponse(res, 500, 'Server Error');
  }
};

// @desc    Get teacher dashboard data
// @route   GET /api/dashboards/teacher
// @access  Private/Teacher
export const getTeacherDashboard = async (req, res) => {
  try {
    // Find all quizzes where the 'createdBy' field matches the logged-in teacher's ID
    const quizzes = await Quiz.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

    // Send back the user info AND the list of quizzes they've created
    res.json({
      message: 'Welcome to the teacher dashboard!',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      quizzes: quizzes // Send the quizzes array in the response
    });
  } catch (error) {
    console.error("--- TEACHER DASHBOARD ERROR ---", error);
    sendErrorResponse(res, 500, 'Server Error');
  }
};