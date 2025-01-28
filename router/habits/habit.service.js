import prisma from '../../prismaClient.js';

const deleteHabit = async (id) => {
    await prisma.habit.update({
        where: {
            id: id,
        },
        data: {
            deletedAt: new Date(),
        },
    })
}



const habitService = {
    deleteHabit,
}

export default habitService;