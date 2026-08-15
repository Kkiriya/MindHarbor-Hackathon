/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `JournalEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JournalEntry_userId_createdAt_key";

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_date_key" ON "JournalEntry"("userId", "date");
