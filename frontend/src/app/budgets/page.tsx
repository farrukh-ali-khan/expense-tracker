// src/app/budgets/page.tsx
"use client";
import { useEffect, useState } from "react";
import { BudgetProgress } from "@/components/BudgetProgress";
import { getBudgets } from "@/lib/api/budgets";
import { Budget } from "@/types/budget";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        setBudgets(data);
      } catch (error) {
        console.error("Failed to load budgets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
    const interval = setInterval(fetchBudgets, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center p-6">Loading budgets...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Budget Management</h1>
      <div className="space-y-4">
        {budgets.length === 0 ? (
          <div className="text-center text-gray-500">
            No budgets found. Create your first budget to get started.
          </div>
        ) : (
          budgets.map((budget) => (
            <BudgetProgress key={budget.id} budget={budget} />
          ))
        )}
      </div>
    </div>
  );
}
