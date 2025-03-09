// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth()!;

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Expense Tracker
            </Link>
            <div className="hidden md:block ml-10 space-x-8">
              {user && (
                <>
                  <Link href="/dashboard" className="...">
                    Dashboard
                  </Link>
                  <Link href="/transactions" className="...">
                    Transactions
                  </Link>
                  <Link href="/categories" className="...">
                    Categories
                  </Link>
                  <Link href="/budgets" className="...">
                    Budgets
                  </Link>
                  <Link href="/reports" className="...">
                    Reports
                  </Link>
                  <Link href="/recurring" className="...">
                    Recurring
                  </Link>
                  <Link href="/profile" className="...">
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-500">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
