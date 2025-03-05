const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const exportController = require("../controllers/exportController");

// Export transactions as CSV (protected route)
router.get(
  "/transactions",
  verifyToken,
  exportController.exportTransactionsCSV
);

module.exports = router;
