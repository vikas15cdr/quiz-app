// src/shared/components/Header.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          QuizMaster
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-500 text-sm font-medium"
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className="text-gray-600 hover:text-blue-500 text-sm font-medium flex items-center gap-1"
            title="See all features"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1" /></svg>
            Features
          </Link>
          <Link 
            to="/about" 
            className="text-gray-600 hover:text-blue-500 text-sm font-medium flex items-center gap-1"
            title="Learn more about us"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1" /></svg>
            About Us
          </Link>

          {/* Auth Buttons */}
          <div className="flex gap-2 ml-4 mt-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">Sign up</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}