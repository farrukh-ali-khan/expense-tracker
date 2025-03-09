// src/app/transactions/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import { getTransactions, deleteTransaction } from "@/lib/api/transactions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { toast } from "sonner";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EditTransactionDialog } from "@/components/EditTransactionDialog";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        setTransactions(transactions.filter((t) => t.id !== id));
        toast.success("Transaction deleted successfully");
      } catch (error) {
        toast.error("Failed to delete transaction");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Link href="/transactions/create">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {transaction.category?.name || "Uncategorized"}
              </TableCell>
              <TableCell
                className={
                  transaction.type === "INCOME"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                ${transaction.amount}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    transaction.type === "INCOME"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <EditTransactionDialog
                    transaction={transaction}
                    onSuccess={loadTransactions}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
