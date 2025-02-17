import prisma from "../../prismaClient.js";
import { studies } from "./seed.study.js";
import { reactions } from "./seed.reaction.js";
import { habits } from "./seed.habit.js";
import { dailyHabitChecks } from "./seed.dailyHabitChecks.js";

async function main() {
  await prisma.study.deleteMany({});
  await prisma.reaction.deleteMany({});
  await prisma.habit.deleteMany({});
  await prisma.dailyHabitCheck.deleteMany({});

  // 1️⃣ Habit 먼저 생성 (중복 방지)
  const createdHabits = {};
  for (const habit of habits) {
    let existingHabit = await prisma.habit.findFirst({
      where: {
        studyId: habit.studyId,
        name: habit.name,
      },
    });

    if (!existingHabit) {
      const { dailyHabitCheck, ...habitData } = habit; // 🔥 dailyHabitCheck 제거
      existingHabit = await prisma.habit.create({ data: habitData });
    }

    // 생성된 habit을 저장
    createdHabits[existingHabit.id] = existingHabit;
  }

  // 2️⃣ DailyHabitCheck 생성 (habitId 매칭)
  for (const dailyHabitCheck of dailyHabitChecks) {
    const habitId = createdHabits[dailyHabitCheck.habitId]; // habitId를 직접 사용

    if (habitId) {
      await prisma.dailyHabitCheck.create({
        data: {
          ...dailyHabitCheck,
          habitId: habitId.id, // 유효한 habitId 삽입
        },
      });
    } else {
      console.warn(`⚠️ 매칭되는 Habit이 없습니다: ${dailyHabitCheck.habitId}`);
    }
  }

  for (const study of studies) {
    const { reactions, ...studyData } = study;

    const createdStudy = await prisma.study.create({
      data: studyData,
    });

    if (reactions) {
      for (const reaction of reactions) {
        await prisma.reaction.create({
          data: {
            ...reaction,
            studyId: createdStudy.id,
          },
        });
      }
    }
  }

  const fetchedStudies = await prisma.study.findMany();
  let idx = 0;
  let cnt = 0;
  let studyId = "";
  for (const reaction of reactions) {
    if (fetchedStudies.length > idx) studyId = fetchedStudies[idx].id;
    await prisma.reaction.create({
      data: { ...reaction, studyId },
    });
    cnt += 1;
    if (cnt === 4) idx += 1;
  }

  console.log("시드 데이터가 성공적으로 생성되었습니다.");
}

main()
  .catch((e) => {
    console.error("시드 데이터 생성 중 에러가 발생했습니다:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
