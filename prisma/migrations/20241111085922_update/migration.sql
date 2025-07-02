/*
  Warnings:

  - The primary key for the `HealthScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `HealthScore` table. All the data in the column will be lost.
  - You are about to drop the column `healthSummaryId` on the `HealthScore` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `HealthScore` table. All the data in the column will be lost.
  - The `id` column on the `HealthScore` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `HealthSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `HealthSummary` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ImplementationPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lifestyleModificationId` on the `ImplementationPlan` table. All the data in the column will be lost.
  - The `id` column on the `ImplementationPlan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Interpretation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Interpretation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LifestyleModification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `healthScoreId` on the `LifestyleModification` table. All the data in the column will be lost.
  - The `id` column on the `LifestyleModification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `NutritionalRecommendation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `healthScoreId` on the `NutritionalRecommendation` table. All the data in the column will be lost.
  - The `id` column on the `NutritionalRecommendation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PotentialCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `healthScoreId` on the `PotentialCondition` table. All the data in the column will be lost.
  - The `id` column on the `PotentialCondition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ServingGuidelines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nutritionalRecommendationId` on the `ServingGuidelines` table. All the data in the column will be lost.
  - The `id` column on the `ServingGuidelines` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BmiAssessment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[interpretationId]` on the table `HealthScore` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bmiAssessmentId]` on the table `HealthScore` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[implementationPlanId]` on the table `LifestyleModification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `MedicalData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servingGuidelinesId]` on the table `NutritionalRecommendation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `interpretationId` to the `HealthScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bmiAssessmentId` to the `HealthScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthAnalysisId` to the `LifestyleModification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `implementationPlanId` to the `LifestyleModification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `MedicalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthAnalysisId` to the `NutritionalRecommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingGuidelinesId` to the `NutritionalRecommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthAnalysisId` to the `PotentialCondition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HealthScore" DROP CONSTRAINT "HealthScore_bmiAssessmentId_fkey";

-- DropForeignKey
ALTER TABLE "HealthScore" DROP CONSTRAINT "HealthScore_healthSummaryId_fkey";

-- DropForeignKey
ALTER TABLE "HealthScore" DROP CONSTRAINT "HealthScore_interpretationId_fkey";

-- DropForeignKey
ALTER TABLE "ImplementationPlan" DROP CONSTRAINT "ImplementationPlan_lifestyleModificationId_fkey";

-- DropForeignKey
ALTER TABLE "LifestyleModification" DROP CONSTRAINT "LifestyleModification_healthScoreId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionalRecommendation" DROP CONSTRAINT "NutritionalRecommendation_healthScoreId_fkey";

-- DropForeignKey
ALTER TABLE "PotentialCondition" DROP CONSTRAINT "PotentialCondition_healthScoreId_fkey";

-- DropForeignKey
ALTER TABLE "ServingGuidelines" DROP CONSTRAINT "ServingGuidelines_nutritionalRecommendationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_healthScoreId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_medicalDataId_fkey";

-- DropIndex
DROP INDEX "ImplementationPlan_lifestyleModificationId_key";

-- DropIndex
DROP INDEX "ServingGuidelines_nutritionalRecommendationId_key";

-- AlterTable
ALTER TABLE "HealthScore" DROP CONSTRAINT "HealthScore_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "healthSummaryId",
DROP COLUMN "updatedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "interpretationId",
ADD COLUMN     "interpretationId" INTEGER NOT NULL,
DROP COLUMN "bmiAssessmentId",
ADD COLUMN     "bmiAssessmentId" INTEGER NOT NULL,
ADD CONSTRAINT "HealthScore_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HealthSummary" DROP CONSTRAINT "HealthSummary_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "HealthSummary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ImplementationPlan" DROP CONSTRAINT "ImplementationPlan_pkey",
DROP COLUMN "lifestyleModificationId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ImplementationPlan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Interpretation" DROP CONSTRAINT "Interpretation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Interpretation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LifestyleModification" DROP CONSTRAINT "LifestyleModification_pkey",
DROP COLUMN "healthScoreId",
ADD COLUMN     "healthAnalysisId" INTEGER NOT NULL,
ADD COLUMN     "implementationPlanId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "LifestyleModification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MedicalData" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NutritionalRecommendation" DROP CONSTRAINT "NutritionalRecommendation_pkey",
DROP COLUMN "healthScoreId",
ADD COLUMN     "healthAnalysisId" INTEGER NOT NULL,
ADD COLUMN     "servingGuidelinesId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "NutritionalRecommendation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PotentialCondition" DROP CONSTRAINT "PotentialCondition_pkey",
DROP COLUMN "healthScoreId",
ADD COLUMN     "healthAnalysisId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "severity" DROP DEFAULT,
ALTER COLUMN "medicalAttention" DROP DEFAULT,
ADD CONSTRAINT "PotentialCondition_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ServingGuidelines" DROP CONSTRAINT "ServingGuidelines_pkey",
DROP COLUMN "nutritionalRecommendationId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ServingGuidelines_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "BmiAssessment";

-- CreateTable
CREATE TABLE "HealthAnalysis" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "healthScoreId" INTEGER NOT NULL,
    "healthSummaryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HealthAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BMIAssessment" (
    "id" SERIAL NOT NULL,
    "bmiValue" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "healthImplications" TEXT NOT NULL,

    CONSTRAINT "BMIAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthAnalysis_healthScoreId_key" ON "HealthAnalysis"("healthScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthAnalysis_healthSummaryId_key" ON "HealthAnalysis"("healthSummaryId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthAnalysis_userId_key" ON "HealthAnalysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthScore_interpretationId_key" ON "HealthScore"("interpretationId");

-- CreateIndex
CREATE UNIQUE INDEX "HealthScore_bmiAssessmentId_key" ON "HealthScore"("bmiAssessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "LifestyleModification_implementationPlanId_key" ON "LifestyleModification"("implementationPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalData_userId_key" ON "MedicalData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NutritionalRecommendation_servingGuidelinesId_key" ON "NutritionalRecommendation"("servingGuidelinesId");

-- AddForeignKey
ALTER TABLE "MedicalData" ADD CONSTRAINT "MedicalData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAnalysis" ADD CONSTRAINT "HealthAnalysis_healthScoreId_fkey" FOREIGN KEY ("healthScoreId") REFERENCES "HealthScore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAnalysis" ADD CONSTRAINT "HealthAnalysis_healthSummaryId_fkey" FOREIGN KEY ("healthSummaryId") REFERENCES "HealthSummary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAnalysis" ADD CONSTRAINT "HealthAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
