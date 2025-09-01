'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Labiotic
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!loading && (
            <>
              {isAuthenticated ? (
                // Authenticated user navigation
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Dashboard
                  </Link>
                  <span className="text-gray-600">Welcome, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </nav>
              ) : (
                // Guest navigation
                <>
                  <nav className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                      Features
                    </a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                      How It Works
                    </a>
                    <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                      Pricing
                    </a>
                    <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                      Testimonials
                    </a>
                  </nav>

                  {/* CTA Button */}
                  <div className="hidden md:flex items-center space-x-4">
                    <Link
                      href="/login"
                      className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Get Started Free
                    </Link>
                  </div>
                </>
              )}
            </>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !loading && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {isAuthenticated ? (
                // Authenticated mobile menu
                <>
                  <Link 
                    href="/dashboard" 
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="block px-3 py-2 text-gray-600 text-sm">
                    Welcome, {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Guest mobile menu
                <>
                  <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Features
                  </a>
                  <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    How It Works
                  </a>
                  <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Pricing
                  </a>
                  <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                    Testimonials
                  </a>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full text-left bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-medium mt-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
