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

const updateHabitById = async (habitId, name, updatedAt) => {
    await prisma.habit.update({
        where: {
            id: habitId,
        },
        data: {
            updatedAt: updatedAt,
            name: name,
        }
    })
}


const habitService = {
    updateHabitById,
    deleteHabitById,
}

export default habitService;