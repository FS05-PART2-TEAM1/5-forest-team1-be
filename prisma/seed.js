import prisma from "../prismaClient.js";

async function main() {
  // 기존 데이터 삭제 (테스트를 위해)
  await prisma.study.deleteMany({});

  // 테스트용 스터디 데이터 생성
  const studies = [
    {
      name: "알고리즘 스터디",
      password: "password123",
      description: "매주 알고리즘 문제를 함께 풀어보는 스터디입니다.",
      backgroundImageUrl: "https://example.com/images/algorithm.jpg",
      point: 100,
      createdAt: new Date("2024-01-01"),
    },
    {
      name: "리액트 스터디",
      password: "password123",
      description: "리액트와 Next.js를 학습하는 스터디입니다.",
      backgroundImageUrl: "https://example.com/images/react.jpg",
      point: 150,
      createdAt: new Date("2024-02-01"),
    },
    {
      name: "파이썬 기초 스터디",
      password: "password123",
      description: "파이썬 기초부터 차근차근 배워보아요",
      backgroundImageUrl: "https://example.com/images/python.jpg",
      point: 80,
      createdAt: new Date("2024-03-01"),
    },
    {
      name: "코딩 테스트 대비",
      password: "password123",
      description: "기업 코딩 테스트 준비를 위한 스터디",
      backgroundImageUrl: "https://example.com/images/coding-test.jpg",
      point: 120,
      createdAt: new Date("2024-03-15"),
    },
    {
      name: "자바스크립트 심화",
      password: "password123",
      description: "자바스크립트 고급 개념 학습 스터디",
      backgroundImageUrl: "https://example.com/images/javascript.jpg",
      point: 200,
      createdAt: new Date("2024-03-20"),
    },
    {
      name: "데이터베이스 실습",
      password: "password123",
      description: "SQL과 NoSQL 데이터베이스 학습",
      backgroundImageUrl: "https://example.com/images/database.jpg",
      point: 90,
      createdAt: new Date("2024-03-25"),
    },
    {
      name: "웹 보안 스터디",
      password: "password123",
      description: "웹 보안과 관련된 개념을 학습합니다.",
      backgroundImageUrl: "https://example.com/images/security.jpg",
      point: 180,
      createdAt: new Date("2024-03-30"),
    },
  ];

  for (const study of studies) {
    await prisma.study.create({
      data: study,
    });
  }

  console.log("시드 데이터가 성공적으로 생성되었습니다.");
}

main()
  .catch((e) => {
    console.error("시드 데이터 생성 중 에러가 발생했습니다:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
