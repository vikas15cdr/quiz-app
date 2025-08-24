import { Routes, Route } from 'react-router-dom';

// Public Pages
import HomePage from '@/shared/pages/HomePage';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';
import FeaturesPage from '@/shared/pages/FeaturesPage';
import AboutPage from '@/shared/pages/AboutPage';
import ContactPage from '@/shared/pages/ContactPage';

// Teacher Pages
import TeacherDashboard from '@/modules/teacher/pages/TeacherDashboard';
import CreateQuizPage from '@/modules/teacher/pages/CreateQuizPage';
import EditQuizPage from '@/modules/teacher/pages/EditQuizPage';

// Student Pages
import StudentDashboard from '@/modules/student/pages/StudentDashboard';
import QuizListPage from '@/modules/student/pages/QuizListPage';
import TakeQuizPage from '@/modules/student/pages/TakeQuizPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* --- Teacher Routes --- */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/create-quiz" element={<CreateQuizPage />} />
      <Route path="/teacher/edit-quiz/:id" element={<EditQuizPage />} />

      {/* --- Student Routes --- */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/quizzes" element={<QuizListPage />} />
      <Route path="/student/quiz/:id" element={<TakeQuizPage />} />
    </Routes>
  );
}
