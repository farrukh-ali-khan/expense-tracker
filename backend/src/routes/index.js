// backend/src/routes/index.js
const express = require("express");
const router = express.Router();

// Welcome route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Expense Tracker API!" });
});

// Auth routes (signup & login)
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

// User routes
const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

// Category routes
const categoryRoutes = require("./categoryRoutes");
router.use("/categories", categoryRoutes);

// Transaction routes (with filtering, sorting, pagination)
const transactionRoutes = require("./transactionRoutes");
router.use("/transactions", transactionRoutes);

// Recurring Transaction routes
const recurringTransactionRoutes = require("./recurringTransactionRoutes");
router.use("/recurring-transactions", recurringTransactionRoutes);

// Export routes (e.g., CSV export)
const exportRoutes = require("./exportRoutes");
router.use("/export", exportRoutes);

// Budget routes
const budgetRoutes = require("./budgetRoutes");
router.use("/budgets", budgetRoutes);

// src/app.js
const summaryRoutes = require("./summaryRoutes");
router.use("/summary", summaryRoutes);

module.exports = router;
