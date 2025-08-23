// FILE: routes/dashboardRoutes.js

import express from 'express';
import { getStudentDashboard, getTeacherDashboard } from '../controllers/dashboardController.js';
import { protect, isTeacher, isStudent } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Student dashboard route
router.get('/student', protect, isStudent, getStudentDashboard);

// Teacher dashboard route
router.get('/teacher', protect, isTeacher, getTeacherDashboard);

export const dashboardRoutes = router;