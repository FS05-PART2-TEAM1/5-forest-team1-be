-- CreateTable
CREATE TABLE "dailyHabit" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dailyHabit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FocusPointLogs" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FocusPointLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "dailyHabit_habitId_idx" ON "dailyHabit"("habitId");

-- CreateIndex
CREATE UNIQUE INDEX "dailyHabit_habitId_date_key" ON "dailyHabit"("habitId", "date");

-- CreateIndex
CREATE INDEX "FocusPointLogs_studyId_idx" ON "FocusPointLogs"("studyId");

-- CreateIndex
CREATE INDEX "Habit_studyId_idx" ON "Habit"("studyId");
