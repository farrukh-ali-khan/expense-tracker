const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateRequest = require("../middleware/validate");
const verifyToken = require("../middleware/auth");
const transactionController = require("../controllers/transactionController");

// Create a transaction with validation (and token protection)
router.post(
  "/",
  verifyToken,
  [
    body("description").notEmpty().withMessage("Description is required."),
    body("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be a positive number."),
    body("date").isISO8601().toDate().withMessage("A valid date is required."),
    body("categoryId").isInt().withMessage("Category ID must be an integer."),
  ],
  validateRequest,
  transactionController.createTransaction
);

// Other transaction routes (get, update, delete)…
router.get("/", verifyToken, transactionController.getTransactions);
router.get("/:id", verifyToken, transactionController.getTransactionById);
router.put("/:id", verifyToken, transactionController.updateTransaction);
router.delete("/:id", verifyToken, transactionController.deleteTransaction);

module.exports = router;
