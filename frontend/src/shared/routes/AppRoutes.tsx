import { Routes, Route } from 'react-router-dom';
import HomePage from '@/shared/pages/HomePage';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';
import FeaturesPage from '../pages/FeaturesPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import CreateQuiz from '@/modules/teacher/pages/CreateQuiz';
import TeacherDashboard from '@/modules/teacher/pages/Dashboard';
import StudentDashboard from '@/modules/student/pages/Dashboard';
import QuizPage from '@/modules/student/pages/QuizPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/teacher/create-quiz" element={<CreateQuiz />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/quiz/:quizId" element={<QuizPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}