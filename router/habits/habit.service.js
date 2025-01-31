import prisma from '../../prismaClient.js';

const deleteHabitById = async (habitId, deletedAt) => {
    await prisma.habit.delete({
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