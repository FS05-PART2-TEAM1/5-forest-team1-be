import prisma from "../../prismaClient.js";

const fetchHabits = async (
  studyId,
  start = new Date(),
  end = new Date(),
  sortBy = "date"
) => {
  // 습관 목록 가져오기
  const habits = await prisma.habit.findMany({
    where: { studyId },
    orderBy: { createdAt: "asc" }, //습관목록 기본정렬: 습관 생성 순 추가
  });

  const habitIds = habits.map((habit) => habit.id);

  // 쿼리 조건 설정
  const orderBy =
    sortBy === "date"
      ? [{ date: "asc" }, { status: "desc" }]
      : [{ status: "desc" }, { date: "asc" }];

  const habitChecks = await prisma.dailyHabitCheck.findMany({
    where: {
      habitId: { in: habitIds },
      date: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
    orderBy,
    select: {
      habitId: true,
      date: true,
      status: true,
    },
  });

  // 습관 목록에 dailyHabitCheck 데이터 매핑
  const habitList = habits.map((habit) => ({
    ...habit,
    dailyHabitCheck: habitChecks
      .filter((check) => check.habitId === habit.id)
      .map((check) => ({
        date: check.date,
        status: check.status,
      })),
  }));

  return habitList;
};

const addHabit = async (studyId, name) => {
  return await prisma.habit.create({
    data: {
      studyId,
      name,
    },
  });
};

const modifyHabits = async (data) => {
  const habits = data.habits;
  const result = [];
  await Promise.all(
    habits.map(async (habitElement) => {
      if (habitElement.id) {
        const isHabit = await prisma.habit.findUnique({
          where: { id: habitElement.id },
        });

        if (isHabit) {
          // update
          result.push(
            await prisma.habit.update({
              where: {
                id: habitElement.id,
              },
              data: {
                name: habitElement.name,
                deletedAt: habitElement.deletedAt,
              },
            })
          );
        }
      } else if (habitElement.studyId) {
        result.push(
          await prisma.habit.create({
            data: {
              studyId: habitElement.studyId,
              name: habitElement.name,
            },
          })
        );
      }
    })
  );
  return result;
};

const modifyDailyHabitCheck = async (habitId, status, start ,end) => {
  const now = new Date();
  const dailyHabitCheck = await prisma.dailyHabitCheck.findFirst({
    where: {
      habitId,
      date: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
  });

  if(dailyHabitCheck){
    return await prisma.dailyHabitCheck.update({
      where: {
        id: dailyHabitCheck.id,
      },
      data: {
        status,
        date: new Date(now),
      }
    })
  } else {
    return await prisma.dailyHabitCheck.create({
      data: {
        habitId,
        date: new Date(now),
      }
    })
  }
};

const fetchHabitCheck = async (habitId, start, end) => {
  const habitCheckList = await prisma.dailyHabitCheck.findMany({
    where: {
      habitId,
      date: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return habitCheckList;
};

const habitService = {
  fetchHabits,
  addHabit,
  modifyHabits,
  modifyDailyHabitCheck,
  fetchHabitCheck,
};

export default habitService;
