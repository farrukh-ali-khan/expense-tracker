// src/lib/seed.ts
export const seedInitialData = async () => {
  try {
    // Create sample category
    await api.post("/categories", {
      name: "Groceries",
      type: "EXPENSE",
    });

    // Create sample transaction
    await api.post("/transactions", {
      description: "Weekly groceries",
      amount: 150,
      date: new Date().toISOString(),
      categoryId: 1,
      type: "EXPENSE",
    });

    // Create sample budget
    await api.post("/budgets", {
      amount: 500,
      month: new Date().toISOString().slice(0, 7),
      categoryId: 1,
    });

    console.log("Sample data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

// Call once in your app initialization
// seedInitialData();
