import prisma from "../../prismaClient.js";

const fetchHabits = async (
  studyId,
  start = new Date(),
  end = new Date(),
  sortBy = "status"
) => {
  console.log("studyId:", studyId);
  console.log("받은 날짜:", { start, end });
  console.log("정렬 기준:", sortBy);

  // 습관 목록 가져오기
  const habits = await prisma.habit.findMany({
    where: { studyId },
  });

  const habitIds = habits.map((habit) => habit.id);

  // 쿼리 조건 설정
  const orderBy = createOrderBy(sortBy);
  const habitChecks = await prisma.dailyHabitCheck.findMany({
    where: {
      habitId: { in: habitIds },
      date: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
    orderBy, // 동적으로 설정된 정렬 조건 사용
    select: {
      habitId: true,
      date: true,
      status: true,
    },
  });
  console.log("변환된 날짜:", { startDate: start, endDate: end });
  console.log("가져온 dailyHabitCheck 데이터:", habitChecks);

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

// 동적으로 정렬 조건 생성
const createOrderBy = (sortBy) => {
  if (sortBy === "status") {
    return [
      { status: "desc" }, // status가 true인 항목이 먼저 오도록 내림차순 정렬
      { date: "asc" }, // status가 동일한 경우에 날짜 순서대로 정렬
    ];
  } else if (sortBy === "date") {
    return [
      { date: "asc" }, // 날짜 순 오름차순
      { status: "desc" }, // 동일한 날짜에 대해, status가 true인 항목이 먼저
    ];
  }

  return [];
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
      date: new Ddate(today),
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
