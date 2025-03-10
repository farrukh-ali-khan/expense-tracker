// src/lib/api.ts
import axios from "axios";

// Create a reusable axios instance
const createApiInstance = () => {
  let token: string | null = null;

  // Only attempt to get token if window is defined
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

// Export a singleton instance
export const api = createApiInstance();

// Add response interceptor to handle token refresh
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
