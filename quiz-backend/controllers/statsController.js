import User from '../models/User.js';
import Quiz from '../models/Quiz.js';
import { sendSuccessResponse, sendErrorResponse } from '../utils/apiResponse.js';

export const getStats = async (req, res) => {
  try {
    // Count all documents in the User and Quiz collections
    const userCount = await User.countDocuments();
    const quizCount = await Quiz.countDocuments();
    
    // For "Countries", we'll just use a placeholder number for now
    const countryCount = 12; 

    sendSuccessResponse(res, 200, {
      activeUsers: userCount,
      quizzesCreated: quizCount,
      countries: countryCount
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Server Error');
  }
};