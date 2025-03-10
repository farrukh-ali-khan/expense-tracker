// src/app/transactions/create/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import { createTransaction } from "@/lib/api/transactions";
import { toast } from "sonner";

export default function TransactionCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        buttonText="Create Transaction"
        loading={loading}
      />
    </div>
  );
}
