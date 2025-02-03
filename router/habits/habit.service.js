import prisma from '../../prismaClient.js';

const modifyHabitById = async (habitId, data) => {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data,
    select: { habitId: true, deletedAt: true, select: true },
  });
  return updatedHabit;
};

const modifyDailyHabitById = async (habitId, data) => {
    const dayOfWeek = new Date().getDay();
    await prisma.dailyHabit.update({
        where: {
            habitId_dayOfWeek: {
                habitId,
                dayOfWeek,
            },
        },
        data,
    })
}


const habitService = {
    modifyHabitById,
    modifyDailyHabitById,
}

export default habitService;
