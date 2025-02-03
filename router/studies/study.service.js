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
          { name: { contains: keyword, mode: "insensitive" } },
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
      orderBy.point = "desc";
      break;
    case "leastPoints":
      orderBy.point = "asc";
      break;
    default:
      orderBy.createdAt = "desc";
  }

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const studies = await prisma.study.findMany({
    where,
    orderBy,
    skip,
    take,
    select: {
      id: true,
      name: true,
      description: true,
      points: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.study.count({ where });

  const studyIds = studies.map((study) => study.id);

  const reactions = await prisma.reaction.findMany({
    where: {
      studyId: {
        in: studyIds,
      },
    },
  });

  const studiesWithReactions = studies.map((study) => ({
    ...study,
    reactions: reactions.filter((reaction) => reaction.studyId === study.id),
  }));

  return {
    studies: studiesWithReactions,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / Number(pageSize)),
  };
};

/// 스터디 만들기
export const addStudy = async (
  name,
  description,
  backgroundImageUrl,
  password
) => {
  /// 비밀번호 해싱 처리 (saltRounds = 10)
  const hashedPassword = await bcrypt.hash(password, 10);

  const study = await prisma.study.create({
    data: {
      name,
      password: hashedPassword,
      description,
      backgroundImageUrl,
    },
  });
  return study;
};

const studyService = {
  fetchAllStudies,
  addStudy,
};

export default studyService;
