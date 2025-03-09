// src/components/IncomeExpenseChart.tsx
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function IncomeExpenseChart({ transactions }: { transactions: any[] }) {
  const processData = () => {
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }

      return acc;
    }, {});

    return Object.values(groupedData);
  };

  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={2}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={2}
              name="Expense"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
