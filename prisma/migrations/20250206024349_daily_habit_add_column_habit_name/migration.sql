/*
  Warnings:

  - Added the required column `habitName` to the `dailyHabitCheck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dailyHabitCheck" ADD COLUMN     "habitName" TEXT NOT NULL;
