// src/components/SpendingByCategoryChart.tsx
"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export function SpendingByCategoryChart({
  transactions,
}: {
  transactions: any[];
}) {
  const processData = () => {
    const categoryMap = transactions.reduce((acc, transaction) => {
      if (transaction.type === "EXPENSE") {
        const category = transaction.category?.name || "Uncategorized";
        acc[category] = (acc[category] || 0) + transaction.amount;
      }
      return acc;
    }, {});

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  };

  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processData()}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {processData().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
