import prisma from "../../prismaClient.js";

const addPoint = async (studyId, data) => {
  const newFocusPointLog = await prisma.focusPointLogs.create({
    data: {
      studyId,
      points: data.points,
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
      totalPoints: {
        increment: data.points,
      },
    },
    select: {
      id: true,
      title: true,
      nickname: true,
      totalPoints: true,
    },
  });

  return { ...changedStudy, pointLog: newFocusPointLog };
};

const pointService = {
  addPoint,
};

export default pointService;
