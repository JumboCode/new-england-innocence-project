/*
  Warnings:

  - You are about to drop the column `jurisdiction` on the `CaseInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdditionalInfo" ALTER COLUMN "advocacyInvolvement" DROP NOT NULL,
ALTER COLUMN "educationalBackground" DROP NOT NULL,
ALTER COLUMN "healthInfo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CaseInfo" DROP COLUMN "jurisdiction",
ADD COLUMN     "jurisdictionId" TEXT,
ALTER COLUMN "caseNumber" DROP NOT NULL,
ALTER COLUMN "yearsInPrison" DROP NOT NULL,
ALTER COLUMN "arrestDate" DROP NOT NULL,
ALTER COLUMN "convictionDate" DROP NOT NULL,
ALTER COLUMN "freedomDate" DROP NOT NULL,
ALTER COLUMN "exonerationDate" DROP NOT NULL,
ALTER COLUMN "crimeType" DROP NOT NULL,
ALTER COLUMN "sentence" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LegalInfo" ALTER COLUMN "originalCharges" DROP NOT NULL,
ALTER COLUMN "legalRepresentation" DROP NOT NULL,
ALTER COLUMN "prosecutor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MetaData" ALTER COLUMN "dataSource" DROP NOT NULL,
ALTER COLUMN "lastUpdated" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PersonalInfo" ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PostExonerationInfo" ALTER COLUMN "publicApology" DROP NOT NULL,
ALTER COLUMN "compensationAmount" DROP NOT NULL,
ALTER COLUMN "currentCountry" DROP NOT NULL,
ALTER COLUMN "currentState" DROP NOT NULL,
ALTER COLUMN "occupation" DROP NOT NULL,
ALTER COLUMN "compensationDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WrongfulConvictionInfo" ALTER COLUMN "falseConfession" DROP NOT NULL,
ALTER COLUMN "eyewitnessMisidentification" DROP NOT NULL,
ALTER COLUMN "inadequateLegalDefense" DROP NOT NULL,
ALTER COLUMN "policeProsecutorialMisconduct" DROP NOT NULL,
ALTER COLUMN "forensicEvidence" DROP NOT NULL,
ALTER COLUMN "informantTestimony" DROP NOT NULL;
