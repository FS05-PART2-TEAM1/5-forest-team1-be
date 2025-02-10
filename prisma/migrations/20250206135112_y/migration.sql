-- AddForeignKey
ALTER TABLE "dailyHabitCheck" ADD CONSTRAINT "dailyHabitCheck_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
