const { PrismaClient } = require("@prisma/client");
const { Parser } = require("json2csv");
const prisma = new PrismaClient();

exports.exportTransactionsCSV = async (req, res) => {
  try {
    // Optionally, filter by user using req.userId from authentication middleware
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId },
      include: { category: true },
    });

    const fields = ["id", "description", "amount", "date", "category.name"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactions);

    res.header("Content-Type", "text/csv");
    res.attachment("transactions.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
