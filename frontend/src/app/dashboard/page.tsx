import Link from "next/link";

// src/app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Overview</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Balance</h3>
          <p className="text-2xl font-bold text-gray-500">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Monthly Income</h3>
          <p className="text-2xl font-bold text-green-600">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Monthly Expenses</h3>
          <p className="text-2xl font-bold text-red-600">$0.00</p>
        </div>
      </div>

      {/* Recent Transactions (Empty State) */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-500">
            Recent Transactions
          </h2>
          <Link
            href="/transactions/new"
            className="text-gray-600 px-4 py-2 bg-white text-primary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Add Transaction
          </Link>
        </div>
        <div className="text-center py-12 text-gray-500">
          No transactions found. Create your first transaction!
        </div>
      </div>
    </div>
  );
}
