// src/components/SummaryCard.tsx
"use client";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

interface SummaryCardProps {
  title: string;
  value: number;
  currency?: string;
  trend: "up" | "down" | "neutral" | "none";
}

export function SummaryCard({
  title,
  value,
  currency = "",
  trend,
}: SummaryCardProps) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold">
          {currency}
          {Math.abs(value).toLocaleString()}
        </span>
        {trend !== "none" && (
          <span
            className={`flex items-center text-sm ${
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {trend === "up" && <ArrowUpIcon className="h-4 w-4" />}
            {trend === "down" && <ArrowDownIcon className="h-4 w-4" />}
            {trend === "neutral" && <MinusIcon className="h-4 w-4" />}
          </span>
        )}
      </div>
    </div>
  );
}
