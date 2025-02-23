/*
  Warnings:

  - The `originalCharges` column on the `LegalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AdditionalInfo" ALTER COLUMN "advocacyInvolvement" DROP NOT NULL,
ALTER COLUMN "educationalBackground" DROP NOT NULL,
ALTER COLUMN "healthInfo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CaseInfo" ALTER COLUMN "caseNumber" DROP NOT NULL,
ALTER COLUMN "yearsInPrison" DROP NOT NULL,
ALTER COLUMN "arrestDate" DROP NOT NULL,
ALTER COLUMN "convictionDate" DROP NOT NULL,
ALTER COLUMN "freedomDate" DROP NOT NULL,
ALTER COLUMN "exonerationDate" DROP NOT NULL,
ALTER COLUMN "crimeType" DROP NOT NULL,
ALTER COLUMN "sentence" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "jurisdiction" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LegalInfo" DROP COLUMN "originalCharges",
ADD COLUMN     "originalCharges" TEXT[],
ALTER COLUMN "legalRepresentation" DROP NOT NULL,
ALTER COLUMN "prosecutor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MetaData" ALTER COLUMN "dataSource" DROP NOT NULL,
ALTER COLUMN "lastUpdated" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PersonalInfo" ADD COLUMN     "imageURL" TEXT,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
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

-- CreateTable
CREATE TABLE "JurisdictionDropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "JurisdictionDropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JurisdictionDropdownOption_value_key" ON "JurisdictionDropdownOption"("value");
