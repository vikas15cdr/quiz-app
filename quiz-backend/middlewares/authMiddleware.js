// FILE: middlewares/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// Make sure you have this utility file or handle errors directly
import { sendErrorResponse } from '../utils/apiResponse.js'; 

// Protect routes by verifying token
export const protect = async (req, res, next) => {
  let token;
  console.log("Inside Protect");
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 401, 'Not authorized, token failed');
    }
  }

  if (!token) {
    return sendErrorResponse(res, 401, 'Not authorized, no token');
  }
};

// Middleware to check for 'teacher' role
export const isTeacher = (req, res, next) => {
  if (req.user && req.user.userType === 'teacher') {
    next();
  } else {
    sendErrorResponse(res, 403, 'Access denied. Not a teacher.');
  }
};

// Middleware to check for 'student' role
export const isStudent = (req, res, next) => {
  console.log("Inside Student");
  if (req.user && req.user.userType === 'student') {
    next();
  } else {
    sendErrorResponse(res, 403, 'Access denied. Not a student.');
  }
};