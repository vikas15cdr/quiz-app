// src/shared/routes/Routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/shared/pages/HomePage';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';
import AboutPage from '@/shared/pages/AboutPage';
import ContactPage from '@/shared/pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Header + Footerwrapper
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);