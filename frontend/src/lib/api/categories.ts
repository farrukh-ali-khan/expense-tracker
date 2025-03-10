// src/lib/api/categories.ts
import { api } from "@/lib/api";
import axios from "axios";
import { Category, CategoryType } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        window.location.href = "/auth/login";
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
    throw error;
  }
};

export const createCategory = async (data: {
  name: string;
  type: CategoryType;
}): Promise<Category> => {
  try {
    const response = await api.post<Category>("/categories", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create category"
      );
    }
    throw error;
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Category not found");
    }
    throw error;
  }
};

export const updateCategory = async (
  id: number,
  data: { name: string; type: CategoryType }
): Promise<Category> => {
  try {
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update category"
      );
    }
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete category"
      );
    }
    throw error;
  }
};
