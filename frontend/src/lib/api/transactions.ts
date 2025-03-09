// src/lib/api/transactions.ts
import { api } from "@/lib/api";
import { Transaction } from "@/types/transaction";
import axios from "axios";

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get("/transactions");
    return response.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const createTransaction = async (data: Transaction) => {
  try {
    const response = await api.post<Transaction>("/transactions", data);
    return response.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

export const updateTransaction = async (
  id: number,
  data: Partial<Transaction>
) => {
  try {
    const response = await api.put<Transaction>(`/transactions/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error("You don't have permission to edit this transaction");
      }
      throw new Error(
        error.response?.data?.message || "Failed to update transaction"
      );
    }
    throw error;
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    await api.delete(`/transactions/${id}`);
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Helper function to handle authentication errors
const handleAuthError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    throw new Error(error.response?.data?.message || "Authentication failed");
  }
  throw error;
};
