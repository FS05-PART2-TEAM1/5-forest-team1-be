import prisma from "../prismaClient.js";
import { studies } from "./seeds/seed.study.js";

async function main() {
  await prisma.reaction.deleteMany({});
  await prisma.study.deleteMany({});

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
