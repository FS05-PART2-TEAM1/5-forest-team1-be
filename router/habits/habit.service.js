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

const updateHabitById = async (name, habitId) => {
    await prisma.habit.update({
        where: {
            id: habitId,
        },
        data: {
            name: name,
        }
    })
}


const habitService = {
    updateHabitById,
    deleteHabitById,
}

export default habitService;