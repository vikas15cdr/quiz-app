// src/shared/components/Header.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

export default function Header() {
  const { isAuthenticated, logout } = useAuth(); // Get auth state and logout function

  return (
    <header className="sticky top-0 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          QuizMaster
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-blue-500 text-sm font-medium"
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className="text-gray-600 hover:text-blue-500 text-sm font-medium"
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className="text-gray-600 hover:text-blue-500 text-sm font-medium"
          >
            About Us
          </Link>
        </nav>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            // --- SHOW THIS IF LOGGED IN ---
            <Button onClick={logout} variant="destructive" size="sm">
              Logout
            </Button>
          ) : (
            // --- SHOW THIS IF LOGGED OUT ---
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}