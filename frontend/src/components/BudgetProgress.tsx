// src/components/BudgetProgress.tsx
"use client";
import { Budget } from "@/types/budget";
import { Transaction } from "@/types/transaction";

interface BudgetProgressProps {
  budget: Budget;
  transactions: Transaction[];
}

export function BudgetProgress({ budget, transactions }: BudgetProgressProps) {
  const calculateSpent = () => {
    return transactions
      .filter((t) => t.categoryId === budget.categoryId)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const spent = calculateSpent();
  const progress = Math.min((spent / budget.amount) * 100, 100);
  const remaining = budget.amount - spent;

  return (
    <div className="border p-4 rounded-lg mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{budget.category.name}</h3>
        <span
          className={`text-sm ${
            remaining < 0 ? "text-red-600" : "text-gray-600"
          }`}
        >
          ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
        </span>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progress > 100 ? "#EF4444" : "#3B82F6",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">
          {remaining >= 0
            ? `$${remaining.toFixed(2)} remaining`
            : `$${Math.abs(remaining).toFixed(2)} over budget`}
        </span>
        <span className="text-gray-500">{progress.toFixed(1)}%</span>
      </div>
    </div>
  );
}
