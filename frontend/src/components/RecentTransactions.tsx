// src/components/RecentTransactions.tsx
import { Transaction } from "@/types";
import { deleteTransaction } from "@/lib/api/transactions";
import { EditTransactionDialog } from "./EditTransactionDialog";
import { Button } from "./ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        // You should add state management here to update the UI
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      }
    }
  };

  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex-1">
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`${
                  transaction.type === "INCOME"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ${transaction.amount}
              </span>
              <EditTransactionDialog
                transaction={transaction}
                onSuccess={() => window.location.reload()} // Update this with proper state management
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(transaction.id)}
              >
                <TrashIcon className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
