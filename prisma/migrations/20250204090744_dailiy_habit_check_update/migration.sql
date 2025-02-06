-- DropIndex
DROP INDEX "dailyHabitCheck_habitId_idx";

-- CreateIndex
CREATE INDEX "dailyHabitCheck_date_habitId_idx" ON "dailyHabitCheck"("date", "habitId");
