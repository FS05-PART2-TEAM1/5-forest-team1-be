/*
  Warnings:

  - You are about to drop the column `name` on the `Study` table. All the data in the column will be lost.
  - Added the required column `backgroundContent` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundType` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `Study` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" DROP COLUMN "name",
ADD COLUMN     "backgroundContent" TEXT NOT NULL,
ADD COLUMN     "backgroundType" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
