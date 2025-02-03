import prisma from "../prismaClient.js";
import { habits } from "./seeds/seed.habits.js";

async function main() {
  await prisma.habit.deleteMany({});

  for (const habit of habits) {
    await prisma.habit.create({
      data: habit,
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
