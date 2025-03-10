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

export const createTransaction = async (data: TransactionFormData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await api.post(
      "/transactions",
      {
        ...data,
        amount: Number(data.amount),
        date: data.date.toISOString().split("T")[0], // Format as YYYY-MM-DD
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    let errorMessage = "Failed to create transaction";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;

      // Handle specific error cases
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }

      if (error.response?.status === 400) {
        errorMessage =
          "Invalid transaction data: " +
          (error.response.data.errors?.join(", ") || "Check all fields");
      }
    }

    throw new Error(errorMessage);
  }
};

export const updateTransaction = async (
  id: number,
  data: Partial<Transaction>
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`/api/transactions/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error(
          "You do not have permission to update this transaction"
        );
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
