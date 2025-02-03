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
      description,
      backgroundImageUrl,
      password: hashedPassword,
    },
  });

  // password 필드만 제외하고 반환
  const { password, ...studyWithoutPassword } = study;
  return studyWithoutPassword;
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

  const isPasswordValid = await bcrypt.compare(password, study.password);
  if (!isPasswordValid) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  return true;
};

const studyService = {
  fetchAllStudies,
  addStudy,
  verifyPassword,
};

export default studyService;
