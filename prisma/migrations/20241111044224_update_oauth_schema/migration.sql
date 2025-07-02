/*
  Warnings:

  - You are about to drop the `AuthToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Session_userId_key";

-- DropTable
DROP TABLE "AuthToken";
