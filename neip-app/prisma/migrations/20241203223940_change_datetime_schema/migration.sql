-- AlterTable
ALTER TABLE "CaseInfo" ALTER COLUMN "arrestDate" SET DATA TYPE TEXT,
ALTER COLUMN "convictionDate" SET DATA TYPE TEXT,
ALTER COLUMN "freedomDate" SET DATA TYPE TEXT,
ALTER COLUMN "exonerationDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MetaData" ALTER COLUMN "lastUpdated" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PersonalInfo" ALTER COLUMN "dateOfBirth" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PostExonerationInfo" ALTER COLUMN "compensationDate" SET DATA TYPE TEXT;
