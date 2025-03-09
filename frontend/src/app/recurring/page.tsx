// src/app/recurring/page.tsx
"use client";
import { RecurringTransactionForm } from "@/components/RecurringTransactionForm";

export default function RecurringPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <RecurringTransactionForm
        frequencies={["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]}
        categories={categories}
        onSubmit={handleRecurringCreate}
      />

      <div className="mt-8">
        {recurringTransactions.map((transaction) => (
          <RecurringTransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}
