/*
  Warnings:

  - You are about to drop the column `currentXP` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "currentXP",
DROP COLUMN "level";

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "currentLevel" INTEGER NOT NULL DEFAULT 1,
    "requiredXP" INTEGER NOT NULL DEFAULT 200,
    "currentXP" INTEGER NOT NULL DEFAULT 0,
    "xpToNextLevel" INTEGER NOT NULL,
    "percentageToNextLevel" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_characterId_key" ON "Level"("characterId");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
