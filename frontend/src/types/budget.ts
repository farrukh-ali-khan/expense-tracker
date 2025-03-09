// src/types/budget.ts
export interface Budget {
  id: number;
  amount: number;
  month: string;
  categoryId: number;
  userId: number;
  category: Category;
}

// src/types/category.ts
export interface Category {
  id: number;
  name: string;
  type: "INCOME" | "EXPENSE";
  userId: number;
}
