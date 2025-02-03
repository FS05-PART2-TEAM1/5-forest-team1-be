import prisma from "../../prismaClient.js";
import { studies } from "./seed.study.js";
import { reactions } from "./seed.reaction.js";
import { habits } from "./seed.habits.js";

async function main() {
  await prisma.study.deleteMany({});
  await prisma.reaction.deleteMany({});
  await prisma.habit.deleteMany({});

  for (const habit of habits) {
    await prisma.habit.create({
      data: habit,
    });
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
