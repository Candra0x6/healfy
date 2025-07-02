/*
  Warnings:

  - The primary key for the `BMIAssessment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `age` on the `Biometrics` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The primary key for the `HealthAnalysis` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `healthSummaryId` on the `HealthAnalysis` table. All the data in the column will be lost.
  - The primary key for the `HealthScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HealthSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ImplementationPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Interpretation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LifestyleModification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `NutritionalRecommendation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PotentialCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ServingGuidelines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `healthScoreId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `medicalDataId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[healthSummeryId]` on the table `HealthAnalysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BMIAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Biometrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Condition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HealthAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HealthScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HealthSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ImplementationPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Interpretation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LifestyleModification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NutritionalRecommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PotentialCondition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ServingGuidelines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HealthAnalysis" DROP CONSTRAINT "HealthAnalysis_healthScoreId_fkey";

-- DropForeignKey
ALTER TABLE "HealthAnalysis" DROP CONSTRAINT "HealthAnalysis_healthSummaryId_fkey";

-- DropForeignKey
ALTER TABLE "HealthScore" DROP CONSTRAINT "HealthScore_bmiAssessmentId_fkey";

-- DropForeignKey
ALTER TABLE "HealthScore" DROP CONSTRAINT "HealthScore_interpretationId_fkey";

-- DropForeignKey
ALTER TABLE "LifestyleModification" DROP CONSTRAINT "LifestyleModification_healthAnalysisId_fkey";

-- DropForeignKey
ALTER TABLE "LifestyleModification" DROP CONSTRAINT "LifestyleModification_implementationPlanId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalData" DROP CONSTRAINT "MedicalData_userId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionalRecommendation" DROP CONSTRAINT "NutritionalRecommendation_healthAnalysisId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionalRecommendation" DROP CONSTRAINT "NutritionalRecommendation_servingGuidelinesId_fkey";

-- DropForeignKey
ALTER TABLE "PotentialCondition" DROP CONSTRAINT "PotentialCondition_healthAnalysisId_fkey";

-- DropIndex
DROP INDEX "HealthAnalysis_healthSummaryId_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BMIAssessment" DROP CONSTRAINT "BMIAssessment_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BMIAssessment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BMIAssessment_id_seq";

-- AlterTable
ALTER TABLE "Biometrics" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "age" SET DATA TYPE SMALLINT;

-- AlterTable
ALTER TABLE "Condition" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "HealthAnalysis" DROP CONSTRAINT "HealthAnalysis_pkey",
DROP COLUMN "healthSummaryId",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "healthSummeryId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "healthScoreId" SET DATA TYPE TEXT,
ADD CONSTRAINT "HealthAnalysis_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HealthAnalysis_id_seq";

-- AlterTable
ALTER TABLE "HealthScore" DROP CONSTRAINT "HealthScore_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "interpretationId" SET DATA TYPE TEXT,
ALTER COLUMN "bmiAssessmentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "HealthScore_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HealthScore_id_seq";

-- AlterTable
ALTER TABLE "HealthSummary" DROP CONSTRAINT "HealthSummary_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HealthSummary_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HealthSummary_id_seq";

-- AlterTable
ALTER TABLE "ImplementationPlan" DROP CONSTRAINT "ImplementationPlan_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ImplementationPlan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ImplementationPlan_id_seq";

-- AlterTable
ALTER TABLE "Interpretation" DROP CONSTRAINT "Interpretation_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Interpretation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Interpretation_id_seq";

-- AlterTable
ALTER TABLE "Lifestyle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LifestyleModification" DROP CONSTRAINT "LifestyleModification_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "healthAnalysisId" SET DATA TYPE TEXT,
ALTER COLUMN "implementationPlanId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LifestyleModification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LifestyleModification_id_seq";

-- AlterTable
ALTER TABLE "MedicalData" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "NutritionalRecommendation" DROP CONSTRAINT "NutritionalRecommendation_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "healthAnalysisId" SET DATA TYPE TEXT,
ALTER COLUMN "servingGuidelinesId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "NutritionalRecommendation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "NutritionalRecommendation_id_seq";

-- AlterTable
ALTER TABLE "PotentialCondition" DROP CONSTRAINT "PotentialCondition_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "healthAnalysisId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PotentialCondition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PotentialCondition_id_seq";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ServingGuidelines" DROP CONSTRAINT "ServingGuidelines_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ServingGuidelines_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ServingGuidelines_id_seq";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "healthScoreId",
DROP COLUMN "medicalDataId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'User',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "xpReward" INTEGER NOT NULL DEFAULT 10,
    "requiredCount" INTEGER NOT NULL DEFAULT 1,
    "currentCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "habitId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "currentXP" INTEGER NOT NULL DEFAULT 0,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyCheckin" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "streak" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DailyCheckin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirement" INTEGER NOT NULL,
    "reward" TEXT,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissionCompletion" (
    "id" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "missionId" TEXT NOT NULL,

    CONSTRAINT "MissionCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE INDEX "MissionCompletion_missionId_idx" ON "MissionCompletion"("missionId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Condition_medicalDataId_idx" ON "Condition"("medicalDataId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthAnalysis_healthSummeryId_key" ON "HealthAnalysis"("healthSummeryId");

-- CreateIndex
CREATE INDEX "HealthAnalysis_userId_idx" ON "HealthAnalysis"("userId");

-- CreateIndex
CREATE INDEX "HealthAnalysis_deletedAt_idx" ON "HealthAnalysis"("deletedAt");

-- CreateIndex
CREATE INDEX "LifestyleModification_healthAnalysisId_idx" ON "LifestyleModification"("healthAnalysisId");

-- CreateIndex
CREATE INDEX "MedicalData_userId_idx" ON "MedicalData"("userId");

-- CreateIndex
CREATE INDEX "MedicalData_deletedAt_idx" ON "MedicalData"("deletedAt");

-- CreateIndex
CREATE INDEX "NutritionalRecommendation_healthAnalysisId_idx" ON "NutritionalRecommendation"("healthAnalysisId");

-- CreateIndex
CREATE INDEX "PotentialCondition_healthAnalysisId_idx" ON "PotentialCondition"("healthAnalysisId");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "VerificationToken_expires_idx" ON "VerificationToken"("expires");

-- AddForeignKey
ALTER TABLE "MedicalData" ADD CONSTRAINT "MedicalData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAnalysis" ADD CONSTRAINT "HealthAnalysis_healthScoreId_fkey" FOREIGN KEY ("healthScoreId") REFERENCES "HealthScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAnalysis" ADD CONSTRAINT "HealthAnalysis_healthSummeryId_fkey" FOREIGN KEY ("healthSummeryId") REFERENCES "HealthSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthScore" ADD CONSTRAINT "HealthScore_interpretationId_fkey" FOREIGN KEY ("interpretationId") REFERENCES "Interpretation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthScore" ADD CONSTRAINT "HealthScore_bmiAssessmentId_fkey" FOREIGN KEY ("bmiAssessmentId") REFERENCES "BMIAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialCondition" ADD CONSTRAINT "PotentialCondition_healthAnalysisId_fkey" FOREIGN KEY ("healthAnalysisId") REFERENCES "HealthAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifestyleModification" ADD CONSTRAINT "LifestyleModification_implementationPlanId_fkey" FOREIGN KEY ("implementationPlanId") REFERENCES "ImplementationPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifestyleModification" ADD CONSTRAINT "LifestyleModification_healthAnalysisId_fkey" FOREIGN KEY ("healthAnalysisId") REFERENCES "HealthAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionalRecommendation" ADD CONSTRAINT "NutritionalRecommendation_servingGuidelinesId_fkey" FOREIGN KEY ("servingGuidelinesId") REFERENCES "ServingGuidelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionalRecommendation" ADD CONSTRAINT "NutritionalRecommendation_healthAnalysisId_fkey" FOREIGN KEY ("healthAnalysisId") REFERENCES "HealthAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "LifestyleModification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyCheckin" ADD CONSTRAINT "DailyCheckin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionCompletion" ADD CONSTRAINT "MissionCompletion_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
