const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateRequest = require("../middleware/validate");
const verifyToken = require("../middleware/auth");
const recurringTransactionController = require("../controllers/recurringTransactionController");

router.post(
  "/",
  verifyToken,
  [
    body("description").notEmpty().withMessage("Description is required."),
    body("amount").isFloat({ gt: 0 }).withMessage("Amount must be positive."),
    body("frequency").notEmpty().withMessage("Frequency is required."),
    body("startDate")
      .isISO8601()
      .toDate()
      .withMessage("Valid start date is required."),
    body("categoryId").isInt().withMessage("Category ID must be an integer."),
  ],
  validateRequest,
  recurringTransactionController.createRecurringTransaction
);

router.get(
  "/",
  verifyToken,
  recurringTransactionController.getRecurringTransactions
);

module.exports = router;
