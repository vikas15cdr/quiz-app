import express from 'express';
import cors from 'cors';
import { quizRoutes } from './routes/quizRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
// --- IMPORT THE DASHBOARD ROUTES ---
import { dashboardRoutes } from './routes/dashboardRoutes.js'; 
import { errorHandler } from './middlewares/errorHandler.js';
import connectDB from './config/db.js';
import { statsRoutes } from './routes/statsRoutes.js';

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', "https://quiz-app-lime-one-75.vercel.app/"],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/auth', authRoutes);
// --- ADD THE DASHBOARD ROUTES ---
app.use('/api/dashboards', dashboardRoutes);
app.use('/api/stats', statsRoutes);

// Error Handler (Must be last!)
app.use(errorHandler);

// DB Connection
connectDB();

export default app;