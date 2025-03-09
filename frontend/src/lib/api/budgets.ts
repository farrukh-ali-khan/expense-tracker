// src/lib/api/budgets.ts
import { api } from "@/lib/api";
import { Budget } from "@/types/budget";

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await api.get("/budgets");
  return response.data;
};
