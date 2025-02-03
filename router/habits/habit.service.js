import prisma from "../../prismaClient.js";

const fetchHabits = async (studyId) => {
  try {
    const habitList = await prisma.habit.findMany({
      where: { studyId },

    });
    return habitList;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch habits.");
  }
};

const addHabit = async (studyId, name) => {
  try {
    const newHabit = await prisma.habit.create({
      data: {
        studyId,
        name,
      },
    });
    return newHabit;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add a new habit.");
  }
};

const modifyHabitById = async (habitId, data) => {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data,
  });
  return updatedHabit;
};

const habitService = {
  fetchHabits,
  addHabit,
  modifyHabitById,
};

export default habitService;
