// src/app/transactions/create/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TransactionForm } from "@/components/TransactionForm";
import { createTransaction } from "@/lib/api/transactions";
import { getCategories } from "@/lib/api/categories";
import { Category } from "@/types/category";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function TransactionCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Add this line
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { user } = useAuth()!;

  const handleSubmit = async (data: TransactionFormData) => {
    try {
      if (!user) {
        toast.error("You must be logged in to create a transaction");
        return;
      }

      setLoading(true);
      await createTransaction({
        ...data,
        userId: user.id,
        date: data.date.toISOString(),
      });
      toast.success("Transaction created successfully");
      router.push("/transactions");
    } catch (error) {
      toast.error("Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (categoriesLoading) return <div>Loading categories...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Transaction</h1>
      <TransactionForm
        categories={categories}
        onSubmit={handleSubmit}
        loading={loading} // Now properly defined
      />
    </div>
  );
}
