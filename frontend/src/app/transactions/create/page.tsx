// src/app/transactions/create/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TransactionForm from "@/components/TransactionForm";
import { createTransaction } from "@/lib/api/transactions";
import { getCategories } from "@/lib/api/categories";
import { Category } from "@/types";
import { toast } from "sonner";

export default function TransactionCreatePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (data: TransactionFormData) => {
    setLoading(true);
    try {
      await createTransaction(data);
      toast.success("Transaction created successfully");
      router.push("/transactions");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Transaction</h1>
      <TransactionForm
        onSubmit={handleSubmit}
        categories={categories}
        loading={loading}
      />
    </div>
  );
}
