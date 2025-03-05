const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createRecurringTransaction = async (req, res) => {
  const { description, amount, frequency, startDate, endDate, categoryId } =
    req.body;
  try {
    const recurring = await prisma.recurringTransaction.create({
      data: {
        description,
        amount,
        frequency,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        category: { connect: { id: parseInt(categoryId) } },
        user: { connect: { id: req.userId } },
      },
    });
    res.status(201).json(recurring);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecurringTransactions = async (req, res) => {
  try {
    const recurring = await prisma.recurringTransaction.findMany({
      where: { userId: req.userId },
      include: { category: true },
    });
    res.json(recurring);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
