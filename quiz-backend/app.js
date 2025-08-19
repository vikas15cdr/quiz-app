import express from 'express';
import cors from 'cors';
import { quizRoutes } from './routes/quizRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import connectDB from './config/db.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/auth', authRoutes);

// Error Handler (Must be last!)
app.use(errorHandler);

// DB Connection
connectDB();

export default app;