import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { API_ERRORS } from '../config/constants.js';
import { sendErrorResponse } from '../utils/apiResponse.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];  // Bearer <token>
    if (!token) throw new Error(API_ERRORS.UNAUTHORIZED);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error(API_ERRORS.UNAUTHORIZED);

    req.user = user;  // Attach user to request
    next();
  } catch (err) {
    sendErrorResponse(res, 401, err.message);
  }
};