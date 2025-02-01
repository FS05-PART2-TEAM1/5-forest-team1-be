import prisma from "../../prismaClient.js";
import { studies } from "./seed.study.js";
import { reactions } from "./seed.reaction.js";

async function main() {
  await prisma.study.deleteMany({});
  await prisma.reaction.deleteMany({});

  for (const study of studies) {
    await prisma.study.create({
      data: study,
    });
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
