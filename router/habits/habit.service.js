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

const modifyHabitById = async (habitId, data) => {
  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data,
  });
  return updatedHabit;
};

const modifyDailyHabitCheck = async (habitId, status) => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const korNow = new Date(utc + koreaTimeDiff);
  const year = korNow.getFullYear();
  const month = ("0" + (1 + korNow.getMonth())).slice(-2);
  const day = ("0" + korNow.getDate()).slice(-2);
  const today = `${year}-${month}-${day}`; // YYYY-MM-DD

  const dailyHabitCheck = await prisma.dailyHabitCheck.upsert({
    where: {
      habitId_date: {
        habitId,
        date: new Date(today),
      },
    },
    update: {
      date: new Date(today),
      status,
    },
    create: {
      habitId,
      date: new Date(today),
    },
  });

  return dailyHabitCheck;
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
  modifyHabitById,
  modifyDailyHabitCheck,
  fetchHabitCheck,
};

export default habitService;
