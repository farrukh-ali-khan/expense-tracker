const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createBudget = async (req, res) => {
  const { amount, month, categoryId } = req.body;
  try {
    const budget = await prisma.budget.create({
      data: {
        amount,
        month,
        category: { connect: { id: parseInt(categoryId) } },
        user: { connect: { id: req.userId } },
      },
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await prisma.budget.findMany({
      where: { userId: req.userId },
      include: { category: true },
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, month, categoryId } = req.body;
  try {
    // Verify the budget belongs to the user
    const budget = await prisma.budget.findUnique({
      where: { id: parseInt(id) },
    });
    if (!budget || budget.userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access or budget not found." });
    }
    const updatedBudget = await prisma.budget.update({
      where: { id: parseInt(id) },
      data: {
        amount,
        month,
        category: { connect: { id: parseInt(categoryId) } },
      },
    });
    res.json(updatedBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await prisma.budget.findUnique({
      where: { id: parseInt(id) },
    });
    if (!budget || budget.userId !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access or budget not found." });
    }
    await prisma.budget.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Budget deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
