// src/types/transaction.ts
import { Category } from "./category";

export type TransactionType = "INCOME" | "EXPENSE";

export interface TransactionFormData {
  description: string;
  amount: number;
  date: Date;
  categoryId: number;
  type: TransactionType;
}

export interface Transaction extends TransactionFormData {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}
