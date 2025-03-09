// src/lib/api/categories.ts
import { api } from "@/lib/api";
import { Category, CategoryType } from "@/types/category";

export const getCategories = async () => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

// src/lib/api/categories.ts
export const createCategory = async (data: {
  name: string;
  type: CategoryType;
  userId: number;
}) => {
  const response = await api.post<Category>("/categories", data);
  return response.data;
};

export const getCategoryById = async (
  id: number,
  data: { name: string; type: CategoryType }
) => {
  const response = await api.get<Category>(`/categories/${id}`, data);
  return response.data;
};

export const updateCategory = async (
  id: number,
  data: { name: string; type: CategoryType }
) => {
  const response = await api.put<Category>(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  await api.delete(`/categories/${id}`);
};
