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

export const addStudy = async (studyData) => {
  const { name, password, passwordConfirm, description, backgroundImageUrl } =
    studyData;

  // 비밀번호 일치 여부 검증
  if (password !== passwordConfirm) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  // 동일한 스터디 이름이 있는지 확인
  const existingStudy = await prisma.study.findFirst({
    // name 필드가 unique로 설정되어있지 않아 findUnique대신 사용
    where: {
      name: name,
    },
  });

  // 이미 존재하는 스터디인 경우
  if (existingStudy) {
    // 비밀번호 검증
    if (existingStudy.password !== password) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    throw new Error("이미 존재하는 스터디 이름입니다.");
  }

  const study = await prisma.study.create({
    data: {
      name,
      password,
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
