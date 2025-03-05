// backend/src/controllers/categoryController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single category by ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new category
exports.createCategory = async (req, res) => {
  const { name, type, userId } = req.body;
  try {
    // Check if the user exists first
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found. Please create the user first." });
    }

    // If user exists, create the category
    const category = await prisma.category.create({
      data: {
        name,
        type,
        user: { connect: { id: parseInt(userId) } },
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE an existing category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, type },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
