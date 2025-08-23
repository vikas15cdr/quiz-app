import User from '../models/User.js';
import Quiz from '../models/Quiz.js'; // Import the Quiz model

// @desc    Get student dashboard data
// @route   GET /api/dashboards/student
// @access  Private/Student
export const getStudentDashboard = async (req, res) => {
  // For now, we'll just send user info. The student will see quizzes on the QuizListPage.
  res.json({
    message: 'Welcome to the student dashboard!',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

// @desc    Get teacher dashboard data
// @route   GET /api/dashboards/teacher
// @access  Private/Teacher
export const getTeacherDashboard = async (req, res) => {
  try {
    // --- NEW ---
    // Find all quizzes where the 'createdBy' field matches the logged-in teacher's ID
    const quizzes = await Quiz.find({ createdBy: req.user._id });

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
    res.status(500).json({ message: 'Server Error' });
  }
};