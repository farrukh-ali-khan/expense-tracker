"use client";
import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TransactionForm from "@/components/TransactionForm";
import { updateTransaction } from "@/lib/api/transactions";
import { getCategories } from "@/lib/api/categories";
import { toast } from "sonner";
import { Category } from "@/types";

export function EditTransactionDialog({
  transaction,
  onSuccess,
}: {
  transaction: Transaction;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
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

    if (open) {
      loadCategories();
    }
  }, [open]);

  const handleSubmit = async (data: Transaction) => {
    setLoading(true);
    try {
      const response = await updateTransaction(transaction.id, {
        ...data,
        userId: transaction.userId, // Preserve original user ID
      });

      if (response) {
        onSuccess();
        setOpen(false);
        toast.success("Transaction updated successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
      if (error.message.includes("permission")) {
        router.push("/transactions");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm
          initialData={transaction}
          onSubmit={handleSubmit}
          categories={categories}
          buttonText="Save Changes"
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
