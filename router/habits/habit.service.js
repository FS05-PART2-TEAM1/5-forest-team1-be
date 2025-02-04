import prisma from '../../prismaClient.js';

const modifyHabitById = async (habitId, data) => {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data,
  });
  return updatedHabit;
};

const modifyDailyHabitById = async (habitId, status) => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);
  const year = korNow.getFullYear();
  const month = ('0' + (1 + korNow.getMonth())).slice(-2);
  const day = ('0' + korNow.getDate()).slice(-2);
  const today = `${year}-${month}-${day}`; // YYYY-MM-DD

  const dailyHabit = await prisma.dailyHabit.upsert({
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

  return dailyHabit;
};

const habitService = {
  modifyHabitById,
  modifyDailyHabitById,
};

export default habitService;
