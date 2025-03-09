// src/types/category.ts
export type CategoryType = "INCOME" | "EXPENSE";

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
