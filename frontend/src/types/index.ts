export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: Category;
  date: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
}
