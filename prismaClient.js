// prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * UTC -> KST 변환
 * - prisma 'create', 'update', 'upsert' 시
 */
prisma.$use(async (params, next) => {
  // create, update, upsert 액션에 대해서만 처리
  if (["create", "update", "upsert"].includes(params.action)) {
    const KST_OFFSET = 9 * 60 * 60 * 1000; // 9시간 (밀리초 단위)
    const nowUTC = new Date();
    const nowKST = new Date(nowUTC.getTime() + KST_OFFSET);

    if (params.action === "create") {
      if (params.args.data) {
        // createdAt, updatedAt 값이 명시되지 않은 경우 KST 시간 할당
        if (!params.args.data.createdAt) {
          params.args.data.createdAt = nowKST;
        }
        if (!params.args.data.updatedAt) {
          params.args.data.updatedAt = nowKST;
        }
      }
    } else if (params.action === "update") {
      if (params.args.data) {
        // 업데이트 시 항상 updatedAt을 KST로 갱신
        params.args.data.updatedAt = nowKST;
      }
    } else if (params.action === "upsert") {
      if (params.args.create) {
        if (!params.args.create.createdAt) {
          params.args.create.createdAt = nowKST;
        }
        if (!params.args.create.updatedAt) {
          params.args.create.updatedAt = nowKST;
        }
      }
      if (params.args.update) {
        params.args.update.updatedAt = nowKST;
      }
    }
  }

  // next 함수를 호출하여 다음 미들웨어 또는 쿼리 실행으로 전달합니다.
  return next(params);
});

export default prisma;
