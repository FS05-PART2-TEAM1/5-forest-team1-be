import prisma from "../../prismaClient.js";

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
  });

  const total = await prisma.study.count({ where });

  return {
    studies,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / Number(pageSize)),
  };
};

export const removeStudy = async (studyId) => {
  try {
    const study = await prisma.study.findUnique({
      where: {
        id: studyId,
      },
    });
    if (!study) {
      return null;
    }
    const removed = await prisma.study.delete({
      where: {
        id: studyId,
      },
    });
    return removed;
  } catch (err) {
    console.error("스터디 삭제 중 오류 발생", err);
    throw err;
  }
};

const studyService = {
  fetchAllStudies,
  removeStudy,
};

export default studyService;
