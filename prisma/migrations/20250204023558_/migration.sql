/*
  Warnings:

  - You are about to drop the column `duration` on the `FocusPointLogs` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `FocusPointLogs` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `FocusPointLogs` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `FocusPointLogs` table. All the data in the column will be lost.
  - Added the required column `finishedAt` to the `FocusPointLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `focusTime` to the `FocusPointLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `FocusPointLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `FocusPointLogs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `dailyHabit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FocusPointLogs" DROP COLUMN "duration",
DROP COLUMN "endTime",
DROP COLUMN "point",
DROP COLUMN "startTime",
ADD COLUMN     "finishedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "focusTime" INTEGER NOT NULL,
ADD COLUMN     "points" INTEGER NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "dailyHabit" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dailyHabit_habitId_date_key" ON "dailyHabit"("habitId", "date");
