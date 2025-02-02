/*
  Warnings:

  - You are about to drop the column `day` on the `dailyHabit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[habitId,dayOfWeek]` on the table `dailyHabit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayOfWeek` to the `dailyHabit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "dailyHabit_habitId_day_key";

-- AlterTable
ALTER TABLE "dailyHabit" DROP COLUMN "day",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dailyHabit_habitId_dayOfWeek_key" ON "dailyHabit"("habitId", "dayOfWeek");
