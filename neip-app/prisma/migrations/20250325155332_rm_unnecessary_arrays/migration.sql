-- AlterTable
ALTER TABLE "LegalInfo" ALTER COLUMN "convictionMethod" DROP NOT NULL,
ALTER COLUMN "convictionMethod" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PostExonerationInfo" ALTER COLUMN "reentrySupport" DROP NOT NULL,
ALTER COLUMN "reentrySupport" SET DATA TYPE TEXT;
