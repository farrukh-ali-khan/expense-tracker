// src/lib/validators/transaction.ts
import { z } from "zod";

export const transactionSchema = z.object({
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(50, "Description too long (max 50 characters)"),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Amount must be positive"),
  date: z.date(),
  categoryId: z.string().min(1, "Category is required"),
  type: z.enum(["INCOME", "EXPENSE"]),
});
