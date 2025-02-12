/*
  Warnings:

  - You are about to drop the column `jurisdictionId` on the `CaseInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CaseInfo" DROP COLUMN "jurisdictionId",
ADD COLUMN     "jurisdiction" TEXT;
