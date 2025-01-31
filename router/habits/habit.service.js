import prisma from '../../prismaClient.js';

const deleteHabitById = async (deletedAt, habitId) => {
    await prisma.habit.update({
        where: {
            id: habitId,
        },
        data: {
            deletedAt: deletedAt,
        },
    })
}


const habitService = {
    updateHabitById,
    deleteHabitById,
}

export default habitService;