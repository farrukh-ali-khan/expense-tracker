// src/components/ProfileImageUpload.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function ProfileImageUpload() {
  const { user, updateUser } = useAuth()!;
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/users/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateUser(response.data);
    } catch (err) {
      setError("Failed to upload image");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
