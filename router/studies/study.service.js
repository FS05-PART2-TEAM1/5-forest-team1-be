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

/// 스터디 수정 서비스 함수
export const modifyStudy = async (
  studyId,
  name,
  description,
  backgroundUrl
) => {
  try {
    const study = await prisma.study.findUnique({
      where: { id: studyId },
    });

    if (!study) {
      return null;
    }

    const modifyData = {};
    if (name) modifyData.name = name;

    if (description) modifyData.description = description;

    if (backgroundUrl) modifyData.backgroundUrl = backgroundUrl;

    const result = await prisma.study.update({
      where: { id: studyId },
      data: modifyData,
    });

    return result;
  } catch (err) {
    console.error("스터디 수정 중 오류 발생", err);
    throw err;
  }
};

const studyService = {
  fetchAllStudies,
  modifyStudy,
};

export default studyService;
