// src/components/TransactionForm.tsx
"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Transaction } from "@/types";
import { Category } from "@/lib/api/categories";
import { transactionSchema } from "@/lib/validators/transaction";
import { z } from "zod";

export type TransactionFormData = z.infer<typeof transactionSchema>;

export default function TransactionForm({
  initialData,
  onSubmit,
  buttonText = "Add Transaction",
  categories = [],
  loading = false,
}: {
  initialData?: Partial<Transaction>;
  onSubmit: (data: TransactionFormData) => void;
  buttonText?: string;
  categories?: Category[];
  loading?: boolean;
}) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
    defaultValues: {
      description: initialData?.description || "",
      amount: initialData?.amount?.toString() || "0",
      type: initialData?.type || "EXPENSE",
      categoryId: initialData?.category?.id?.toString() || "",
      date: initialData?.date ? new Date(initialData.date) : new Date(),
    },
  });

  // Reset category selection when categories load
  useEffect(() => {
    if (categories.length > 0) {
      form.setValue("categoryId", "");
      form.trigger("categoryId");
    }
  }, [categories, form]);

  const transactionSchema = z.object({
    description: z
      .string()
      .min(2, "Description must be at least 2 characters")
      .max(50, "Description too long"),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    }),
    date: z.date(),
    categoryId: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Invalid category selection",
    }),
    type: z.enum(["INCOME", "EXPENSE"]),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter transaction description"
                  className={
                    form.formState.errors.description?.message
                      ? "border-red-500"
                      : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  className={
                    form.formState.errors.amount?.message
                      ? "border-red-500"
                      : ""
                  }
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={
                        form.formState.errors.date?.message
                          ? "border-red-500"
                          : ""
                      }
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.trigger("categoryId");
                }}
                value={field.value}
                disabled={categories.length === 0}
              >
                <FormControl>
                  <SelectTrigger className="min-w-[200px]">
                    <SelectValue
                      placeholder={
                        categories.length === 0
                          ? "Create categories first"
                          : "Select category"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                  {categories.length === 0 && (
                    <SelectItem value="nocat" disabled className="hidden">
                      No categories
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                  <SelectItem value="INCOME">Income</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading || categories.length === 0}
          className="w-full"
        >
          {loading ? "Processing..." : buttonText}
        </Button>
      </form>
    </Form>
  );
}
