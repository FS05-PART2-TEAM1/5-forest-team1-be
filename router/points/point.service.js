import prisma from "../../prismaClient.js";

const addPoint = async (studyId, data) => {
  const newFocusPointLog = await prisma.focusPointLogs.create({
    data: {
      studyId,
      points: data.focusPoints,
      focusTime: data.focusTime,
      startedAt: data.startedAt,
      finishedAt: data.finishedAt,
    },
  });

  const changedStudy = await prisma.study.update({
    where: {
      id: studyId,
    },
    data: {
      points: data.points,
    },
    select: {
      id: true,
      name: true,
      points: true,
    },
  });

  return { ...changedStudy, pointLog: newFocusPointLog };
};

const pointService = {
  addPoint,
};

export default pointService;
