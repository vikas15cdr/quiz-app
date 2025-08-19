import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { API_ERRORS } from '../config/constants.js';
import { sendErrorResponse } from '../utils/apiResponse.js';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({ id: user._id, email });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error(API_ERRORS.INVALID_CREDENTIALS);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });
    res.json({ token });
  } catch (err) {
    sendErrorResponse(res, 401, err.message);
  }
};

// Get current user (protected)
export const getCurrentUser = async (req, res) => {
  res.json(req.user);  // User attached by authMiddleware
};