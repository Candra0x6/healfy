-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SmokingStatus" AS ENUM ('NON_SMOKER', 'FORMER_SMOKER', 'ACTIVE_SMOKER');

-- CreateEnum
CREATE TYPE "AlcoholConsumption" AS ENUM ('NEVER', 'OCCASIONAL', 'FREQUENT');

-- CreateEnum
CREATE TYPE "DietaryPattern" AS ENUM ('BALANCED', 'VEGETARIAN', 'VEGAN', 'HIGH_PROTEIN', 'HIGH_CARB', 'LOW_FAT', 'KETO', 'GLUTEN_FREE', 'NO_SPECIAL_DIET');

-- CreateEnum
CREATE TYPE "PhysicalActivity" AS ENUM ('VERY_RARE', 'RARE', 'MODERATE', 'REGULAR');

-- CreateEnum
CREATE TYPE "ConditionType" AS ENUM ('Obesity', 'Asthma', 'Gastritis', 'Migraine', 'Hypertension', 'Cholesterol', 'Anemia', 'Vertigo', 'Gout', 'Diabetes', 'Diarrhea', 'Diabetes_Mellitus');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "MedicalAttention" AS ENUM ('monitoring', 'consult', 'immediate');

-- CreateTable
CREATE TABLE "medical_data" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "biometricsId" TEXT NOT NULL,
    "lifestyleId" TEXT NOT NULL,

    CONSTRAINT "medical_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biometrics" (
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

    CONSTRAINT "biometrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lifestyle" (
    "id" TEXT NOT NULL,
    "smokingHabit" "SmokingStatus" NOT NULL,
    "alcoholConsumption" "AlcoholConsumption" NOT NULL,
    "dietaryPattern" "DietaryPattern" NOT NULL,
    "physicalActivity" "PhysicalActivity" NOT NULL,

    CONSTRAINT "lifestyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conditions" (
    "id" TEXT NOT NULL,
    "name" "ConditionType" NOT NULL,
    "medicalDataId" TEXT NOT NULL,

    CONSTRAINT "conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthScore" (
    "id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "interpretationId" TEXT,
    "bmiAssessmentId" TEXT,
    "healthSummaryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpretation" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Interpretation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BmiAssessment" (
    "id" TEXT NOT NULL,
    "bmiValue" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "healthImplications" TEXT NOT NULL,

    CONSTRAINT "BmiAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialCondition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "severity" "Severity" NOT NULL DEFAULT 'low',
    "medicalAttention" "MedicalAttention" NOT NULL DEFAULT 'monitoring',
    "detailedAnalysis" TEXT NOT NULL,
    "recommendedTests" TEXT[],
    "healthScoreId" TEXT NOT NULL,

    CONSTRAINT "PotentialCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifestyleModification" (
    "id" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "impactFactor" DOUBLE PRECISION NOT NULL,
    "targetConditions" TEXT[],
    "healthScoreId" TEXT NOT NULL,

    CONSTRAINT "LifestyleModification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImplementationPlan" (
    "id" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "precautions" TEXT[],
    "lifestyleModificationId" TEXT NOT NULL,

    CONSTRAINT "ImplementationPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionalRecommendation" (
    "id" TEXT NOT NULL,
    "food" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "targetSymptoms" TEXT[],
    "healthScoreId" TEXT NOT NULL,

    CONSTRAINT "NutritionalRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServingGuidelines" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "bestTimeToConsume" TEXT NOT NULL,
    "preparations" TEXT[],
    "nutritionalRecommendationId" TEXT NOT NULL,

    CONSTRAINT "ServingGuidelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthSummary" (
    "id" TEXT NOT NULL,
    "overallAssessment" TEXT NOT NULL,
    "urgentConcerns" TEXT[],
    "shortTermActions" TEXT[],
    "longTermStrategy" TEXT NOT NULL,
    "followUpRecommendations" TEXT NOT NULL,

    CONSTRAINT "HealthSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medical_data_biometricsId_key" ON "medical_data"("biometricsId");

-- CreateIndex
CREATE UNIQUE INDEX "medical_data_lifestyleId_key" ON "medical_data"("lifestyleId");

-- CreateIndex
CREATE UNIQUE INDEX "ImplementationPlan_lifestyleModificationId_key" ON "ImplementationPlan"("lifestyleModificationId");

-- CreateIndex
CREATE UNIQUE INDEX "ServingGuidelines_nutritionalRecommendationId_key" ON "ServingGuidelines"("nutritionalRecommendationId");

-- AddForeignKey
ALTER TABLE "medical_data" ADD CONSTRAINT "medical_data_biometricsId_fkey" FOREIGN KEY ("biometricsId") REFERENCES "biometrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_data" ADD CONSTRAINT "medical_data_lifestyleId_fkey" FOREIGN KEY ("lifestyleId") REFERENCES "lifestyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conditions" ADD CONSTRAINT "conditions_medicalDataId_fkey" FOREIGN KEY ("medicalDataId") REFERENCES "medical_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthScore" ADD CONSTRAINT "HealthScore_interpretationId_fkey" FOREIGN KEY ("interpretationId") REFERENCES "Interpretation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthScore" ADD CONSTRAINT "HealthScore_bmiAssessmentId_fkey" FOREIGN KEY ("bmiAssessmentId") REFERENCES "BmiAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthScore" ADD CONSTRAINT "HealthScore_healthSummaryId_fkey" FOREIGN KEY ("healthSummaryId") REFERENCES "HealthSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialCondition" ADD CONSTRAINT "PotentialCondition_healthScoreId_fkey" FOREIGN KEY ("healthScoreId") REFERENCES "HealthScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifestyleModification" ADD CONSTRAINT "LifestyleModification_healthScoreId_fkey" FOREIGN KEY ("healthScoreId") REFERENCES "HealthScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImplementationPlan" ADD CONSTRAINT "ImplementationPlan_lifestyleModificationId_fkey" FOREIGN KEY ("lifestyleModificationId") REFERENCES "LifestyleModification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionalRecommendation" ADD CONSTRAINT "NutritionalRecommendation_healthScoreId_fkey" FOREIGN KEY ("healthScoreId") REFERENCES "HealthScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServingGuidelines" ADD CONSTRAINT "ServingGuidelines_nutritionalRecommendationId_fkey" FOREIGN KEY ("nutritionalRecommendationId") REFERENCES "NutritionalRecommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
