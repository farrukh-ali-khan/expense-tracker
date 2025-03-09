// src/app/categories/create/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CategoryForm } from "@/components/CategoryForm";
import { createCategory } from "@/lib/api/categories";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function CategoryCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()!;

  const handleSubmit = async (data: { name: string; type: CategoryType }) => {
    try {
      if (!user) {
        toast.error("You must be logged in to create a category");
        return;
      }

      setLoading(true);
      await createCategory({ ...data, userId: user.id });
      toast.success("Category created successfully");
      router.push("/categories");
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
      <CategoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
