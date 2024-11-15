/*
  Warnings:

  - Added the required column `amount` to the `Compensation` table without a default value. This is not possible if the table is not empty.
  - Made the column `Date` on table `Compensation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compensationId` on table `PostExonerationInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentStatusId` on table `PostExonerationInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CaseInfo" DROP CONSTRAINT "CaseInfo_jurisdictionId_fkey";

-- DropForeignKey
ALTER TABLE "CurrentStatus" DROP CONSTRAINT "CurrentStatus_residenceId_fkey";

-- DropForeignKey
ALTER TABLE "Exoneree" DROP CONSTRAINT "Exoneree_caseInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Exoneree" DROP CONSTRAINT "Exoneree_legalInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Exoneree" DROP CONSTRAINT "Exoneree_metaDataId_fkey";

-- DropForeignKey
ALTER TABLE "Exoneree" DROP CONSTRAINT "Exoneree_personalInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Exoneree" DROP CONSTRAINT "Exoneree_postExonerationInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Exoneree" DROP CONSTRAINT "Exoneree_wrongfulConvictionInfoId_fkey";

-- DropForeignKey
ALTER TABLE "PostExonerationInfo" DROP CONSTRAINT "PostExonerationInfo_compensationId_fkey";

-- DropForeignKey
ALTER TABLE "PostExonerationInfo" DROP CONSTRAINT "PostExonerationInfo_currentStatusId_fkey";

-- AlterTable
ALTER TABLE "Compensation" ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "Date" SET NOT NULL;

-- AlterTable
ALTER TABLE "MetaData" ALTER COLUMN "lastUpdated" DROP DEFAULT,
ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PostExonerationInfo" ALTER COLUMN "compensationId" SET NOT NULL,
ALTER COLUMN "currentStatusId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_caseInfoId_fkey" FOREIGN KEY ("caseInfoId") REFERENCES "CaseInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_legalInfoId_fkey" FOREIGN KEY ("legalInfoId") REFERENCES "LegalInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_metaDataId_fkey" FOREIGN KEY ("metaDataId") REFERENCES "MetaData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_postExonerationInfoId_fkey" FOREIGN KEY ("postExonerationInfoId") REFERENCES "PostExonerationInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_wrongfulConvictionInfoId_fkey" FOREIGN KEY ("wrongfulConvictionInfoId") REFERENCES "WrongfulConvictionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStatus" ADD CONSTRAINT "CurrentStatus_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseInfo" ADD CONSTRAINT "CaseInfo_jurisdictionId_fkey" FOREIGN KEY ("jurisdictionId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostExonerationInfo" ADD CONSTRAINT "PostExonerationInfo_compensationId_fkey" FOREIGN KEY ("compensationId") REFERENCES "Compensation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostExonerationInfo" ADD CONSTRAINT "PostExonerationInfo_currentStatusId_fkey" FOREIGN KEY ("currentStatusId") REFERENCES "CurrentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
