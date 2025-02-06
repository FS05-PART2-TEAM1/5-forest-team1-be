import prisma from "../../prismaClient.js";

const fetchHabits = async (studyId) => {
  const habit = await prisma.habit.findMany({
    where: { studyId },
  });
};

const addHabit = async (studyId, name) => {
  return await prisma.habit.create({
    data: {
      studyId,
      name,
    },
  });
};

const modifyHabitById = async (habitId, data) => {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data,
  });
  return updatedHabit;
};

const modifyDailyHabitCheck = async (habitId, status) => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);
  const year = korNow.getFullYear();
  const month = ("0" + (1 + korNow.getMonth())).slice(-2);
  const day = ("0" + korNow.getDate()).slice(-2);
  const today = `${year}-${month}-${day}`; // YYYY-MM-DD

  const dailyHabitCheck = await prisma.dailyHabitCheck.upsert({
    where: {
      habitId_date: {
        habitId,
        date: new Date(today),
      },
    },
    update: {
      date: new Date(today),
      status,
    },
    create: {
      habitId,
      date: new Date(today),
    },
  });

  return dailyHabitCheck;
};

const fetchHabitCheck = async (habitId, start, end) => {
  const habitCheckList = await prisma.dailyHabitCheck.findMany({
    where: {
      habitId,
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return habitCheckList;
};

const habitService = {
  fetchHabits,
  addHabit,
  modifyHabitById,
  modifyDailyHabitCheck,
  fetchHabitCheck,
};

export default habitService;
