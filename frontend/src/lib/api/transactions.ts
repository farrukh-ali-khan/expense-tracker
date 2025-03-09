// src/lib/api/transactions.ts
import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import axios from "axios";

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get("/transactions");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      window.location.href = "/auth/login";
    }
    throw error;
  }
};

export const createTransaction = async (
  data: Omit<Transaction, "id" | "createdAt">
) => {
  const response = await api.post<Transaction>("/transactions", data);
  return response.data;
};

export const updateTransaction = async (
  id: number,
  data: Partial<Transaction>
) => {
  const response = await api.put<Transaction>(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id: number) => {
  await api.delete(`/transactions/${id}`);
};
