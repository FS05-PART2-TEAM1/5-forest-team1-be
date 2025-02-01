import prisma from '../../prismaClient.js';

const modifyHabitById = async (habitId, data) => {
    await prisma.habit.update({
        where: {
            id: habitId,
        },
        data,
    })
}


const habitService = {
    modifyHabitById,
}

export default habitService;