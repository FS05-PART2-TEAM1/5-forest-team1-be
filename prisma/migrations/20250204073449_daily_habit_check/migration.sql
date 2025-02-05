/*
  Warnings:

  - You are about to drop the `dailyHabit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "dailyHabit";

-- CreateTable
CREATE TABLE "dailyHabitCheck" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dailyHabitCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "dailyHabitCheck_habitId_idx" ON "dailyHabitCheck"("habitId");

-- CreateIndex
CREATE UNIQUE INDEX "dailyHabitCheck_habitId_date_key" ON "dailyHabitCheck"("habitId", "date");
