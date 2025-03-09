// src/components/RecentTransactions.tsx
"use client";
import Link from "next/link";

export function RecentTransactions({ transactions }: { transactions: any[] }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <Link
          href="/transactions"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()} •{" "}
                {transaction.category?.name}
              </p>
            </div>
            <span
              className={`${
                transaction.type === "INCOME"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "INCOME" ? "+" : "-"}$
              {Math.abs(transaction.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
