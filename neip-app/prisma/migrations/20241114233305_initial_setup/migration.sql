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
ALTER TABLE "Compensation" ALTER COLUMN "Date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MetaData" ALTER COLUMN "lastUpdated" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PostExonerationInfo" ALTER COLUMN "compensationId" DROP NOT NULL,
ALTER COLUMN "currentStatusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_caseInfoId_fkey" FOREIGN KEY ("caseInfoId") REFERENCES "CaseInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_legalInfoId_fkey" FOREIGN KEY ("legalInfoId") REFERENCES "LegalInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_metaDataId_fkey" FOREIGN KEY ("metaDataId") REFERENCES "MetaData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_postExonerationInfoId_fkey" FOREIGN KEY ("postExonerationInfoId") REFERENCES "PostExonerationInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_wrongfulConvictionInfoId_fkey" FOREIGN KEY ("wrongfulConvictionInfoId") REFERENCES "WrongfulConvictionInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStatus" ADD CONSTRAINT "CurrentStatus_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseInfo" ADD CONSTRAINT "CaseInfo_jurisdictionId_fkey" FOREIGN KEY ("jurisdictionId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostExonerationInfo" ADD CONSTRAINT "PostExonerationInfo_compensationId_fkey" FOREIGN KEY ("compensationId") REFERENCES "Compensation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostExonerationInfo" ADD CONSTRAINT "PostExonerationInfo_currentStatusId_fkey" FOREIGN KEY ("currentStatusId") REFERENCES "CurrentStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
