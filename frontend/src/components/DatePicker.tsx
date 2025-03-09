// src/components/DatePicker.tsx
"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = ({
  selected,
  onChange,
}: {
  selected: Date;
  onChange: (date: Date) => void;
}) => (
  <DatePicker
    selected={selected}
    onChange={(date) => date && onChange(date)}
    className="border rounded p-2 w-full"
    dateFormat="MM/dd/yyyy"
  />
);
