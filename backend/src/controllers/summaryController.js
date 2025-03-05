// backend/src/controllers/summaryController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getMonthlySummary = async (req, res) => {
  const { startDate, endDate, userId } = req.query;
  try {
    const income = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId: parseInt(userId),
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        category: {
          type: "INCOME",
        },
      },
    });

    const expense = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId: parseInt(userId),
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        category: {
          type: "EXPENSE",
        },
      },
    });

    const summary = {
      totalIncome: income._sum.amount || 0,
      totalExpense: expense._sum.amount || 0,
      netSavings: (income._sum.amount || 0) - (expense._sum.amount || 0),
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
