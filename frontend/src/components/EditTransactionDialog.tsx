// src/components/EditTransactionDialog.tsx
"use client";
import { useState } from "react";
import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTransaction } from "@/lib/api/transactions"; // Fixed import
import TransactionForm from "./TransactionForm";
import { getCategories } from "@/lib/api/categories"; // Add category fetch
import { toast } from "sonner";

export function EditTransactionDialog({
  transaction,
  onSuccess,
}: {
  transaction: Transaction;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const handleOpen = () => {
    loadCategories();
    setOpen(true);
  };

  const handleSubmit = async (data: Transaction) => {
    try {
      await updateTransaction(transaction.id, {
        ...data,
        userId: currentUser.id, // Add this if your backend requires user ID
      });
      onSuccess();
      setOpen(false);
      toast.success("Transaction updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update transaction"
      );
      if (error.message.includes("permission")) {
        // Redirect to transactions list if unauthorized
        router.push("/transactions");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" onClick={handleOpen}>
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
        />
      </DialogContent>
    </Dialog>
  );
}
