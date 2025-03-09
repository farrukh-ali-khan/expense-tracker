// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Expense Tracker
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Manage your finances effectively with our comprehensive expense tracking
        solution. Monitor your spending, create budgets, and analyze your
        financial health.
      </p>
      <div className="space-x-4">
        <Link
          href="/auth/signup"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Get Started
        </Link>
        <Link
          href="/auth/login"
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
