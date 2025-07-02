-- AlterTable
ALTER TABLE "User" ADD COLUMN     "healthScoreId" TEXT,
ADD COLUMN     "medicalDataId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_medicalData_fkey" FOREIGN KEY ("medicalDataId") REFERENCES "medical_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_healthScore_fkey" FOREIGN KEY ("healthScoreId") REFERENCES "HealthScore"("id") ON DELETE SET NULL ON UPDATE CASCADE;
