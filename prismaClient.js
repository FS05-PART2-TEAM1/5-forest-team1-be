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
    params.args.data ??= {};

    switch (params.action) {
      case "create":
        params.args.data.createdAt ??= nowKST;
        params.args.data.updatedAt ??= nowKST;
        if (params.model === "FocusPointLogs") {
          params.args.data.startedAt = new Date(
            params.args.data.startedAt + KST_OFFSET
          );
          params.args.data.finishedAt = new Date(
            params.args.data.finishedAt + KST_OFFSET
          );
        }
        break;
      case "update":
        params.args.data.updatedAt ??= nowKST;
        if (params.model === "Habit") {
          params.args.data.deletedAt = new Date(
            params.args.data.deletedAt + KST_OFFSET
          );
        }
        break;
      case "upsert":
        if (params.args.create) {
          params.args.create.createdAt ??= nowKST;
          params.args.create.updatedAt ??= nowKST;
          if (params.model === "dailyHabitCheck") {
            params.args.data.date = new Date(
              params.args.data.date + KST_OFFSET
            );
          }
        }
        if (params.args.update) {
          params.args.update.updatedAt ??= nowKST;
        }
        break;
    }
  }

  // next 함수를 호출하여 다음 미들웨어 또는 쿼리 실행으로 전달합니다.
  return next(params);
});

export default prisma;
