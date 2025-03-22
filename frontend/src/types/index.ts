// src/types/index.ts
export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: "income" | "expense";
}
