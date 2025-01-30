import prisma from '../../prismaClient.js';

const removeHabitById = async (habitId) => {
    const now = new Date();
    await prisma.habit.update({
        where: {
            id: habitId,
        },
        data: {
            deletedAt: now,
        },
    })
}



const habitService = {
    removeHabitById,
}

export default habitService;