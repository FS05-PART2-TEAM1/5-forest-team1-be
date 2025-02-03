import prisma from '../../prismaClient.js';

const modifyHabitById = async (habitId, data) => {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data,
  });
  return updatedHabit;
};

const modifyDailyHabitById = async (habitId, data) => {
    const startTime = new Date();
    const endTime = new Date();
    startTime.setHours(0,0,0,0);
    endTime.setHours(23,59,59,999);

    const foundDailyHabit = await prisma.dailyHabit.findFirst({
        where: {
            habitId,
            date: {
                    gte: startTime,
                    lte: endTime,
            }
        },
    })

    if(foundDailyHabit){
        const dailyHabit = await prisma.dailyHabit.update({
            where : {
                id: foundDailyHabit.id,
            },
            data: {
                status: data.status,
            },
        })
    } else {
        const dailyHabit = await prisma.dailyHabit.create({
            data : {
                habitId,
                date: now,
                status: data.status,
            }
        })
    }



}


const habitService = {
    modifyHabitById,
    modifyDailyHabitById,
}

export default habitService;
