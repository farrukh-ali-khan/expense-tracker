// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary text-gray-800"
          >
            Expense Tracker
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/signin"
                className="text-gray-600 px-4 py-2 bg-white text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-gray-600 px-4 py-2 bg-white text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
