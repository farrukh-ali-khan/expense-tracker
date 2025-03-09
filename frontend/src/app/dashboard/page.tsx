// src/app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/api/transactions";
import { getBudgets } from "@/lib/api/budgets";
import { Transaction, Budget } from "@/types";
import { SummaryCard } from "@/components/SummaryCard";
import { IncomeExpenseChart } from "@/components/IncomeExpenseChart";
import { SpendingByCategoryChart } from "@/components/SpendingByCategoryChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { BudgetProgress } from "@/components/BudgetProgress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "lucide-react";
import { Button } from "react-day-picker";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time update interval (10 seconds)
  useEffect(() => {
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [transactionsData, budgetsData] = await Promise.all([
        getTransactions(),
        getBudgets(),
      ]);
      setTransactions(transactionsData);
      setBudgets(budgetsData);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  const renderContent = () => {
    const hasTransactions = transactions.length > 0;
    const hasBudgets = budgets.length > 0;

    return (
      <div className="p-6 space-y-8">
        {/* Summary Cards Row (keep existing) */}

        {/* Charts Row */}
        {hasTransactions ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncomeExpenseChart transactions={transactions} />
            <SpendingByCategoryChart transactions={transactions} />
          </div>
        ) : (
          <div className="border p-4 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold">No transactions found</h3>
            <p className="text-gray-500 mt-2">
              Start by creating your first transaction
            </p>
            <Link
              href="/transactions/create"
              className="text-primary mt-4 inline-block"
            >
              Create Transaction
            </Link>
          </div>
        )}

        {/* Budgets Section */}
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
          {hasBudgets ? (
            <div className="space-y-4">
              {budgets.map((budget) => (
                <BudgetProgress
                  key={budget.id}
                  budget={budget}
                  transactions={transactions}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No budgets found</p>
              <Link href="/budgets/create">
                <Button className="mt-4">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create First Budget
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Update the return statement
  return loading ? <DashboardSkeleton /> : renderContent();

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Income"
          value={transactions
            .filter((t) => t.type === "INCOME")
            .reduce((sum, t) => sum + t.amount, 0)}
          trend="up"
          currency="$"
        />
        <SummaryCard
          title="Total Expenses"
          value={transactions
            .filter((t) => t.type === "EXPENSE")
            .reduce((sum, t) => sum + t.amount, 0)}
          trend="down"
          currency="$"
        />
        <SummaryCard
          title="Net Savings"
          value={
            transactions
              .filter((t) => t.type === "INCOME")
              .reduce((sum, t) => sum + t.amount, 0) -
            transactions
              .filter((t) => t.type === "EXPENSE")
              .reduce((sum, t) => sum + t.amount, 0)
          }
          trend="neutral"
          currency="$"
        />
        <SummaryCard
          title="Active Budgets"
          value={budgets.length}
          trend="none"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeExpenseChart transactions={transactions} />
        <SpendingByCategoryChart transactions={transactions} />
      </div>

      {/* Recent Activity & Budgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={transactions.slice(0, 5)} />
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
          <div className="space-y-4">
            {budgets.map((budget) => (
              <BudgetProgress
                key={budget.id}
                budget={budget}
                transactions={transactions}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DashboardSkeleton = () => (
  <div className="p-6 space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-lg" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-96 rounded-lg" />
      <Skeleton className="h-96 rounded-lg" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-96 rounded-lg" />
      <Skeleton className="h-96 rounded-lg" />
    </div>
  </div>
);
