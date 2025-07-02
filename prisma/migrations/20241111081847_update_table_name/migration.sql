/*
  Warnings:

  - You are about to drop the `biometrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conditions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lifestyle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_medicalData_fkey";

-- DropForeignKey
ALTER TABLE "conditions" DROP CONSTRAINT "conditions_medicalDataId_fkey";

-- DropForeignKey
ALTER TABLE "medical_data" DROP CONSTRAINT "medical_data_biometricsId_fkey";

-- DropForeignKey
ALTER TABLE "medical_data" DROP CONSTRAINT "medical_data_lifestyleId_fkey";

-- DropTable
DROP TABLE "biometrics";

-- DropTable
DROP TABLE "conditions";

-- DropTable
DROP TABLE "lifestyle";

-- DropTable
DROP TABLE "medical_data";

-- CreateTable
CREATE TABLE "MedicalData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "biometricsId" TEXT NOT NULL,
    "lifestyleId" TEXT NOT NULL,

    CONSTRAINT "MedicalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biometrics" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "averageDailyBP" DOUBLE PRECISION NOT NULL,
    "heartRate" DOUBLE PRECISION NOT NULL,
    "restingHeartRate" DOUBLE PRECISION NOT NULL,
    "waistCircumference" DOUBLE PRECISION NOT NULL,
    "hipCircumference" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Biometrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lifestyle" (
    "id" TEXT NOT NULL,
    "smokingHabit" "SmokingStatus" NOT NULL,
    "alcoholConsumption" "AlcoholConsumption" NOT NULL,
    "dietaryPattern" "DietaryPattern" NOT NULL,
    "physicalActivity" "PhysicalActivity" NOT NULL,

    CONSTRAINT "Lifestyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL,
    "name" "ConditionType" NOT NULL,
    "medicalDataId" TEXT NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalData_biometricsId_key" ON "MedicalData"("biometricsId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalData_lifestyleId_key" ON "MedicalData"("lifestyleId");

-- RenameForeignKey
ALTER TABLE "User" RENAME CONSTRAINT "User_healthScore_fkey" TO "User_healthScoreId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_medicalDataId_fkey" FOREIGN KEY ("medicalDataId") REFERENCES "MedicalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalData" ADD CONSTRAINT "MedicalData_biometricsId_fkey" FOREIGN KEY ("biometricsId") REFERENCES "Biometrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalData" ADD CONSTRAINT "MedicalData_lifestyleId_fkey" FOREIGN KEY ("lifestyleId") REFERENCES "Lifestyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_medicalDataId_fkey" FOREIGN KEY ("medicalDataId") REFERENCES "MedicalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
