-- CreateTable
CREATE TABLE "CompletedHabit" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompletedHabit_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "backgroundImageUrl" TEXT NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompletedHabit_studyId_idx" ON "CompletedHabit"("studyId");

-- CreateIndex
CREATE INDEX "CompletedHabit_habitId_idx" ON "CompletedHabit"("habitId");

-- CreateIndex
CREATE INDEX "FocusPointLogs_studyId_idx" ON "FocusPointLogs"("studyId");

-- CreateIndex
CREATE INDEX "Habit_studyId_idx" ON "Habit"("studyId");

-- CreateIndex
CREATE INDEX "Reaction_studyId_idx" ON "Reaction"("studyId");
