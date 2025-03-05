// backend/src/controllers/transactionController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all transactions
exports.getTransactions = async (req, res) => {
  try {
    // Extract query parameters for filtering, sorting, and pagination
    const {
      userId,
      categoryId,
      startDate,
      endDate,
      sortBy,
      order,
      page,
      limit,
    } = req.query;

    // Default pagination values (if not provided)
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Build the filtering condition
    const whereCondition = {};
    if (userId) {
      whereCondition.userId = parseInt(userId);
    }
    if (categoryId) {
      whereCondition.categoryId = parseInt(categoryId);
    }
    if (startDate || endDate) {
      whereCondition.date = {};
      if (startDate) {
        whereCondition.date.gte = new Date(startDate);
      }
      if (endDate) {
        whereCondition.date.lte = new Date(endDate);
      }
    }

    // Build the sorting condition
    // Default sorting is by date in descending order
    let orderByCondition = {};
    if (sortBy) {
      // Use the provided sortBy parameter (e.g., "date", "amount")
      // Default order is ascending; if "desc" is specified, sort descending.
      orderByCondition[sortBy] =
        order && order.toLowerCase() === "desc" ? "desc" : "asc";
    } else {
      orderByCondition["date"] = "desc";
    }

    // Query the transactions with filtering, sorting, and pagination
    const transactions = await prisma.transaction.findMany({
      take: limit,
      where: whereCondition,
      orderBy: orderByCondition,
      skip: skip,
      // take: pageSize,
      include: {
        category: true,
        user: true,
      },
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getTransactions = async (req, res) => {
//   try {
//     const transactions = await prisma.transaction.findMany({
//       include: { category: true, user: true },
//     });
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get a single transaction by ID (protected route)
exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
      include: { category: true, user: true },
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found." });
    // Authorization check: ensure the logged-in user owns the transaction
    if (transaction.userId !== req.userId) {
      return res.status(403).json({ message: "Unauthorized access." });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new transaction (the logged-in user's id should be used)
exports.createTransaction = async (req, res) => {
  const { description, amount, date, categoryId } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        date: new Date(date),
        category: { connect: { id: parseInt(categoryId) } },
        user: { connect: { id: req.userId } },
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a transaction (authorization check included)
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { description, amount, date, categoryId } = req.body;
  try {
    // Fetch the existing transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found." });
    // Check if the logged-in user is the owner
    if (transaction.userId !== req.userId) {
      return res.status(403).json({ message: "Unauthorized access." });
    }
    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        description,
        amount,
        date: new Date(date),
        category: { connect: { id: parseInt(categoryId) } },
      },
    });
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a transaction (authorization check included)
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the existing transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found." });
    // Check if the logged-in user is the owner
    if (transaction.userId !== req.userId) {
      return res.status(403).json({ message: "Unauthorized access." });
    }
    await prisma.transaction.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Transaction deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
