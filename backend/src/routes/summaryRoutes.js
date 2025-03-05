// backend/src/routes/summaryRoutes.js
const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summaryController");

router.get("/", summaryController.getMonthlySummary);

module.exports = router;
