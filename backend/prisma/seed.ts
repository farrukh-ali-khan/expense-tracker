// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create test user
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "$2a$10$EXAMPLEHASH", // Hashed "password123"
      categories: {
        create: [
          { name: "Groceries", type: "EXPENSE" },
          { name: "Salary", type: "INCOME" },
        ],
      },
    },
    include: { categories: true },
  });

  console.log("Created user:", user);

  // Create sample transactions
  const transactions = await prisma.transaction.createMany({
    data: [
      {
        description: "Monthly groceries",
        amount: 250.5,
        date: new Date(),
        type: "EXPENSE", // This now matches the schema
        categoryId: user.categories[0].id,
        userId: user.id,
      },
      {
        description: "March Salary",
        amount: 3000.0,
        date: new Date(),
        type: "INCOME", // This now matches the schema
        categoryId: user.categories[1].id,
        userId: user.id,
      },
    ],
  });

  console.log("Created transactions:", transactions);

  // Create sample budget
  const budget = await prisma.budget.create({
    data: {
      amount: 500,
      month: "2024-03",
      categoryId: user.categories[0].id,
      userId: user.id,
    },
  });

  console.log("Created budget:", budget);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Seeding completed.");
  });
