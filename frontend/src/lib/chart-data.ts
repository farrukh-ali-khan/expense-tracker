// src/lib/chart-data.ts
import { Transaction } from "@/types/transaction";

export const processCategoryData = (transactions: Transaction[]) => {
  if (!transactions) return [];

  const categoryMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    const key = transaction.category?.name || "Uncategorized";
    const current = categoryMap.get(key) || 0;
    categoryMap.set(key, current + transaction.amount);
  });

  return Array.from(categoryMap).map(([name, value]) => ({
    name,
    value: Math.abs(value),
  }));
};

export const generateMonthlyTrendData = (transactions: Transaction[]) => {
  const monthlyMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    const current = monthlyMap.get(month) || 0;
    monthlyMap.set(month, current + transaction.amount);
  });

  return Array.from(monthlyMap).map(([name, value]) => ({
    name,
    value: Math.abs(value),
  }));
};
