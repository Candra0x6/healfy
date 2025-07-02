/*
  Warnings:

  - Added the required column `reward` to the `TargetDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TargetDay" ADD COLUMN     "reward" TEXT NOT NULL;
