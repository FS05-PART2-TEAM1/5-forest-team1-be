const fetchedStudies = await prisma.study.findMany();
for (const reaction of reactions) {
  let studyId = "";
  let idx = 0;
  let cnt = 0;
  if (fetchedStudies.length > idx) studyId = fetchedStudies[idx].id;
  await prisma.reaction.create({
    data: { ...reaction, studyId },
  });
  cnt += 1;
  if (cnt === 4) idx += 1;
}
