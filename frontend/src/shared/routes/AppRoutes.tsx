import { Routes, Route } from 'react-router-dom';
import HomePage from '@/shared/pages/HomePage';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';
import FeaturesPage from '../pages/FeaturesPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

// Import Teacher components
import TeacherDashboard from '@/modules/teacher/pages/TeacherDashboard';
import CreateQuizPage from '@/modules/teacher/pages/CreateQuizPage';
import EditQuizPage from '@/modules/teacher/pages/EditQuizPage';

// Import Student components
import StudentDashboard from '@/modules/student/pages/Dashboard';
import QuizListPage from '@/modules/student/pages/QuizListPage';
import TakeQuizPage from '@/modules/student/pages/TakeQuizPage';

// You will likely need a component to handle protected routes
// import ProtectedRoute from '@/shared/components/ProtectedRoute';

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
      {/* These routes should be wrapped in a ProtectedRoute component */}
      {/* Example: <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} /> */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/create-quiz" element={<CreateQuizPage />} />
      <Route path="/teacher/edit-quiz/:id" element={<EditQuizPage />} />
      
      {/* --- Student Routes --- */}
      {/* These routes should also be protected */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/quizzes" element={<QuizListPage />} />
      <Route path="/student/quiz/:id" element={<TakeQuizPage />} />
    </Routes>
  )
}