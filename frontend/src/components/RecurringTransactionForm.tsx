// src/components/RecurringTransactionForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.number().positive("Amount must be positive"),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  startDate: z.date(),
  categoryId: z.number().positive(),
});

export function RecurringTransactionForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
      amount: 0,
      frequency: "MONTHLY",
      startDate: new Date(),
      categoryId: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      // API call here
    } catch (error) {
      console.error("Error creating recurring transaction:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields with proper error handling */}
    </form>
  );
}
