/*
  Warnings:

  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "Transaction" ADD COLUMN     "type" "CategoryType" NOT NULL;
-- Step 1: Add the type column as nullable
ALTER TABLE "Transaction" ADD COLUMN "type" "CategoryType";

-- Step 2: Update existing rows to have a default value
UPDATE "Transaction" SET "type" = 'EXPENSE' WHERE "type" IS NULL;

-- Step 3: Make the column required
ALTER TABLE "Transaction" ALTER COLUMN "type" SET NOT NULL;