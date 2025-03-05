const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateRequest = require("../middleware/validate");
const verifyToken = require("../middleware/auth");
const budgetController = require("../controllers/budgetController");

// Create a budget
router.post(
  "/",
  verifyToken,
  [
    body("amount").isFloat({ gt: 0 }).withMessage("Amount must be positive."),
    body("month")
      .notEmpty()
      .withMessage("Month is required (format: YYYY-MM)."),
    body("categoryId").isInt().withMessage("Category ID must be an integer."),
  ],
  validateRequest,
  budgetController.createBudget
);

// Get all budgets for the user
router.get("/", verifyToken, budgetController.getBudgets);

// Update a budget
router.put("/:id", verifyToken, budgetController.updateBudget);

// Delete a budget
router.delete("/:id", verifyToken, budgetController.deleteBudget);

module.exports = router;
