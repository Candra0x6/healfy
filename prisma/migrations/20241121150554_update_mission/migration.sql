-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "isClaimed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "BadgeCharacter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "chracterId" TEXT NOT NULL,

    CONSTRAINT "BadgeCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BadgeCharacter_chracterId_key" ON "BadgeCharacter"("chracterId");

-- AddForeignKey
ALTER TABLE "BadgeCharacter" ADD CONSTRAINT "BadgeCharacter_chracterId_fkey" FOREIGN KEY ("chracterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
