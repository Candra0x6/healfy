/*
  Warnings:

  - Added the required column `category` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentageProgress` to the `UserAchievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AchievementCategory" AS ENUM ('HABIT', 'LEVEL');

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "category" "AchievementCategory" NOT NULL,
ADD COLUMN     "requirementLevel" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "UserAchievement" ADD COLUMN     "currentProgress" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "isClaimed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "percentageProgress" DOUBLE PRECISION NOT NULL;
