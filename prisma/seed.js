import prisma from "../prismaClient.js";
import { dailyHabits } from "./seeds/seed.dailyHabits.js";

async function main() {
  await prisma.dailyHabit.deleteMany({});
  for (const dailyHabit of dailyHabits) {
    await prisma.dailyHabit.create({
      data: dailyHabit,
    });
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