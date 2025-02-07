import prisma from "../../prismaClient.js";
import bcrypt from "bcrypt";

/// 스터디 목록 조회
export const fetchAllStudies = async (
  page = 1,
  pageSize = 6,
  keyword = "",
  sortBy = "createdAt"
) => {
  const where = keyword
    ? {
        OR: [
          { nickname: { contains: keyword, mode: "insensitive" } },
          { title: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } },
        ],
      }
    : {};

  const orderBy = {};
  switch (sortBy) {
    case "oldest":
      orderBy.createdAt = "asc";
      break;
    case "newest":
      orderBy.createdAt = "desc";
      break;
    case "mostPoints":
      orderBy.totalPoints = "desc";
      break;
    case "leastPoints":
      orderBy.totalPoints = "asc";
      break;
    default:
      orderBy.createdAt = "desc";
  }

  const skip = (Number(page) - 1) * Number(pageSize);
  const take = Number(pageSize);

  const studies = await prisma.study.findMany({
    where,
    orderBy,
    skip,
    take,
    select: {
      id: true,
      nickname: true,
      title: true,
      description: true,
      totalPoints: true,
      backgroundType: true,
      backgroundContent: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.study.count({ where });

  const studyIds = studies.map((study) => study.id);

  const reactions = await prisma.reaction.findMany({
    where: {
      studyId: { in: studyIds },
    },
    orderBy: { counts: "desc" },
  });

  const studiesWithReactions = studies.map((study) => {
    const studyReactions = reactions
      .filter((reaction) => reaction.studyId === study.id)
      .slice(0, 3);
    return {
      ...study,
      reactions: studyReactions,
    };
  });

  return {
    studies: studiesWithReactions,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / Number(pageSize)),
  };
};

/// 스터디 만들기
export const addStudy = async (
  nickname,
  title,
  description,
  backgroundType,
  backgroundContent,
  password
) => {
  /// 비밀번호 해싱 처리 (saltRounds = 10)
  const hashedPassword = await bcrypt.hash(password, 10);

  const study = await prisma.study.create({
    data: {
      nickname,
      title,
      description,
      backgroundType,
      backgroundContent,
      password: hashedPassword,
    },
    select: {
      id: true,
      nickname: true,
      title: true,
      description: true,
      backgroundType: true,
      backgroundContent: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return study;
};

/// 스터디 비밀번호 검증함수
export const verifyPassword = async (studyId, password) => {
  const study = await prisma.study.findUnique({
    where: { id: studyId },
    select: { password: true },
  });

  if (!study) {
    throw new Error("스터디를 찾을 수 없습니다.");
  }

  return await bcrypt.compare(password, study.password);
};

/// 스터디 삭제
export const removeStudy = async (studyId) => {
  const removed = await prisma.study.delete({
    where: { id: studyId },
  });
  return removed;
};

/// 스터디 수정
export const modifyStudy = async (
  studyId,
  nickname,
  title,
  description,
  backgroundType,
  backgroundContent
) => {
  const modifyData = {};
  if (nickname) modifyData.nickname = nickname;
  if (title) modifyData.title = title;
  if (description) modifyData.description = description;
  if (backgroundType) modifyData.backgroundType = backgroundType;
  if (backgroundContent) modifyData.backgroundContent = backgroundContent;

  const result = await prisma.study.update({
    where: { id: studyId },
    data: modifyData,
  });

  return result;
};

const existStudyById = async (id) => {
  return Boolean(
    await prisma.study.findUnique({
      where: { id },
    })
  );
};

/// 스터디 상세 조회
export const fetchStudyDetail = async (studyId) => {
  const study = await prisma.study.findUnique({
    where: { id: studyId },
    select: {
      nickname: true,
      title: true,
      description: true,
      totalPoints: true,
      backgroundType: true,
      backgroundContent: true,
    },
  });

  if (!study) {
    throw new Error("스터디를 찾을 수 없습니다.");
  }

  const reactions = await prisma.reaction.findMany({
    where: { studyId },
    select: {
      emoji: true,
      counts: true,
    },
  });

  const habits = await prisma.habit.findMany({
    where: { studyId },
    select: {
      id: true,
      name: true,
    },
  });

  const habitsWithChecks = [];
  for (const habit of habits) {
    const checks = await prisma.dailyHabitCheck.findMany({
      where: { habitId: habit.id },
      select: {
        date: true,
        status: true,
      },
    });
    habitsWithChecks.push({
      ...habit,
      checks,
    });
  }

  return {
    ...study,
    reactions,
    habits: habitsWithChecks,
  };
};

/// 최근 조회한 스터디 목록 조회
export const fetchRecentStudies = async (studyIds) => {
  if (!studyIds || studyIds.length === 0) {
    return {
      studies: [],
      total: 0,
    };
  }

  const studies = await prisma.study.findMany({
    where: {
      id: { in: studyIds },
    },
    select: {
      id: true,
      nickname: true,
      title: true,
      description: true,
      totalPoints: true,
      backgroundType: true,
      backgroundContent: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const reactions = await prisma.reaction.findMany({
    where: {
      studyId: { in: studyIds },
    },
    orderBy: { counts: "desc" },
  });

  const studiesWithReactions = studies.map((study) => {
    const studyReactions = reactions
      .filter((reaction) => reaction.studyId === study.id)
      .slice(0, 3);
    return {
      ...study,
      reactions: studyReactions,
    };
  });

  return {
    studies: studiesWithReactions,
    total: studies.length,
  };
};

const studyService = {
  fetchAllStudies,
  addStudy,
  verifyPassword,
  removeStudy,
  modifyStudy,
  existStudyById,
  fetchStudyDetail,
  fetchRecentStudies,
};

export default studyService;
