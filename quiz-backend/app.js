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

const allowedOrigins = [
  'https://quiz-app-line-one-75.vercel.app',
  'http://localhost:5173', // optional for local dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you're using cookies or auth headers
}));

app.options('*', cors());
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