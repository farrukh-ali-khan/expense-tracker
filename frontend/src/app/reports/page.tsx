// src/app/reports/page.tsx
"use client";
import { PieChartWrapper, BarChartWrapper } from "@/components/Charts";
import { getTransactions } from "@/lib/api/transactions";
import {
  processCategoryData,
  generateMonthlyTrendData,
} from "@/lib/chart-data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ReportsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="text-center p-6">Loading reports...</div>;

  const categoryData = processCategoryData(transactions);
  const monthlyData = generateMonthlyTrendData(transactions);

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6">
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
        <PieChartWrapper data={categoryData} />
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
        <BarChartWrapper data={monthlyData} />
      </div>
    </div>
  );
}
