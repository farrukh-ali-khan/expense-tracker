// src/app/categories/edit/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CategoryForm } from "@/components/CategoryForm";
import { getCategoryById, updateCategory } from "@/lib/api/categories";
import { Category } from "@/types/category";

export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await getCategoryById(Number(params.id));
        setCategory(data);
      } catch (error) {
        toast.error("Failed to load category");
        router.push("/categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [params.id, router]);

  const handleSubmit = async (data: { name: string; type: CategoryType }) => {
    try {
      setFormLoading(true);
      await updateCategory(Number(params.id), data);
      toast.success("Category updated successfully");
      router.push("/categories");
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <CategoryForm
        initialData={category}
        onSubmit={handleSubmit}
        loading={formLoading}
      />
    </div>
  );
}
