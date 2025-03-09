// src/app/error.tsx
"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
      <h2 className="font-bold">Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}
