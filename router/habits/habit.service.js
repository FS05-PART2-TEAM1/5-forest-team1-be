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
  const year = now.getFullYear();
  const month = ('0' + (1 + now.getMonth())).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);

  const today = `${year}-${month}-${day}`; // YYYY-MM-DD

  const dailyHabit = await prisma.dailyHabit.upsert({
    where: {
      habitId_date: {
        habitId,
        date: today,
      },
    },
    update: {
      date: today,
      status,
    },
    create: {
      habitId,
      date: today,
    },
  });

  return dailyHabit;
};

const habitService = {
  modifyHabitById,
  modifyDailyHabitById,
};

export default habitService;
