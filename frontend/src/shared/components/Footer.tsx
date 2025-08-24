// src/shared/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-12" aria-label="Site Footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo and copyright */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link to="/" className="text-lg font-bold text-blue-600">
              QuizMaster
            </Link>
            <p className="text-gray-500 text-sm md:text-base mt-1">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-4 justify-center" aria-label="Footer Navigation">
            <Link 
              to="/terms" 
              className="text-gray-600 hover:text-blue-500 text-sm"
            >
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-blue-500 text-sm"
            >
              Privacy
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-blue-500 text-sm"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
