import prisma from '../../prismaClient.js';

const modifyHabitById = async (habitId, data) => {
    const updatedHabit = await prisma.habit.update({
        where: {
            id: habitId,
        },
        data,
    })
    return updatedHabit;
}


const habitService = {
    modifyHabitById,
}

export default habitService;