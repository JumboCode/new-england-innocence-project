/*
  Warnings:

  - You are about to drop the column `compensationId` on the `PostExonerationInfo` table. All the data in the column will be lost.
  - You are about to drop the column `currentStatusId` on the `PostExonerationInfo` table. All the data in the column will be lost.
  - You are about to drop the `Compensation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CurrentStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[caseNumber]` on the table `CaseInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `PersonalInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `CaseInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `CaseInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compensationAmount` to the `PostExonerationInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compensationDate` to the `PostExonerationInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentCountry` to the `PostExonerationInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentState` to the `PostExonerationInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `PostExonerationInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CaseInfo" DROP CONSTRAINT "CaseInfo_jurisdictionId_fkey";

-- DropForeignKey
ALTER TABLE "CurrentStatus" DROP CONSTRAINT "CurrentStatus_residenceId_fkey";

-- DropForeignKey
ALTER TABLE "PostExonerationInfo" DROP CONSTRAINT "PostExonerationInfo_compensationId_fkey";

-- DropForeignKey
ALTER TABLE "PostExonerationInfo" DROP CONSTRAINT "PostExonerationInfo_currentStatusId_fkey";

-- DropIndex
DROP INDEX "PostExonerationInfo_compensationId_key";

-- DropIndex
DROP INDEX "PostExonerationInfo_currentStatusId_key";

-- AlterTable
ALTER TABLE "CaseInfo" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostExonerationInfo" DROP COLUMN "compensationId",
DROP COLUMN "currentStatusId",
ADD COLUMN     "compensationAmount" INTEGER NOT NULL,
ADD COLUMN     "compensationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currentCountry" TEXT NOT NULL,
ADD COLUMN     "currentState" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL;

-- DropTable
DROP TABLE "Compensation";

-- DropTable
DROP TABLE "CurrentStatus";

-- DropTable
DROP TABLE "Location";

-- CreateIndex
CREATE UNIQUE INDEX "CaseInfo_caseNumber_key" ON "CaseInfo"("caseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_email_key" ON "PersonalInfo"("email");
