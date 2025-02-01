import prisma from '../../prismaClient.js';

const modifyHabitById = async (habitId, data) => {
    await prisma.habit.update({
        where: {
            id: habitId,
        },
        data,
    })
}

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
