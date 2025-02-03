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
  backgroundImageUrl
) => {
  try {
    const modifyData = {};
    if (name) modifyData.name = name;
    if (description) modifyData.description = description;
    if (backgroundImageUrl) modifyData.backgroundImageUrl = backgroundImageUrl;

    const result = await prisma.study.update({
      where: { id: studyId },
      data: modifyData,
    });

    return result;
  } catch (err) {
    if (err.code === "P2025") {
      return null;
    }
    console.error("스터디 수정 중 오류 발생", err);
    throw err;
  }
};

const studyService = {
  fetchAllStudies,
  modifyStudy,
};

export default studyService;
