// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
