// src/lib/helpers.ts
export function calculateBudgetProgress(
  budget: Budget,
  transactions: Transaction[]
) {
  const spent = transactions
    .filter((t) => t.categoryId === budget.categoryId)
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    spent,
    remaining: budget.amount - spent,
    progress: (spent / budget.amount) * 100,
  };
}
