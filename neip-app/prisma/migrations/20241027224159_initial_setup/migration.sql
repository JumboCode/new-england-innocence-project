-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'OTHER');

-- CreateTable
CREATE TABLE "Exoneree" (
    "id" SERIAL NOT NULL,
    "personalInfoId" INTEGER NOT NULL,
    "caseInfoId" INTEGER NOT NULL,
    "legalInfoId" INTEGER NOT NULL,
    "wrongfulConvictionInfoId" INTEGER NOT NULL,
    "postExonerationInfoId" INTEGER NOT NULL,
    "metaDataId" INTEGER NOT NULL,

    CONSTRAINT "Exoneree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compensation" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Compensation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrentStatus" (
    "id" SERIAL NOT NULL,
    "occupation" TEXT NOT NULL,
    "residenceId" INTEGER NOT NULL,

    CONSTRAINT "CurrentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "race" TEXT NOT NULL,
    "ethnicity" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseInfo" (
    "id" SERIAL NOT NULL,
    "caseNumber" TEXT NOT NULL,
    "jurisdictionId" INTEGER NOT NULL,
    "yearsInPrison" INTEGER NOT NULL,
    "arrestDate" TIMESTAMP(3) NOT NULL,
    "convictionDate" TIMESTAMP(3) NOT NULL,
    "freedomDate" TIMESTAMP(3) NOT NULL,
    "exonerationDate" TIMESTAMP(3) NOT NULL,
    "crimeType" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,

    CONSTRAINT "CaseInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalInfo" (
    "id" SERIAL NOT NULL,
    "originalCharges" TEXT NOT NULL,
    "convictionMethod" TEXT[],
    "exonerationMethod" TEXT[],
    "legalRepresentation" TEXT NOT NULL,
    "prosecutor" TEXT NOT NULL,
    "officersInvolved" TEXT[],

    CONSTRAINT "LegalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WrongfulConvictionInfo" (
    "id" SERIAL NOT NULL,
    "falseConfession" BOOLEAN NOT NULL,
    "eyewitnessMisidentification" BOOLEAN NOT NULL,
    "inadequateLegalDefense" BOOLEAN NOT NULL,
    "policeProsecutorialMisconduct" BOOLEAN NOT NULL,
    "forensicEvidence" BOOLEAN NOT NULL,
    "informantTestimony" BOOLEAN NOT NULL,

    CONSTRAINT "WrongfulConvictionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostExonerationInfo" (
    "id" SERIAL NOT NULL,
    "compensationId" INTEGER NOT NULL,
    "reentrySupport" TEXT[],
    "publicApology" BOOLEAN NOT NULL,
    "currentStatusId" INTEGER NOT NULL,

    CONSTRAINT "PostExonerationInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalInfo" (
    "id" SERIAL NOT NULL,
    "mediaCoverage" TEXT[],
    "advocacyInvolvement" TEXT NOT NULL,
    "educationalBackground" TEXT NOT NULL,
    "healthInfo" TEXT NOT NULL,

    CONSTRAINT "AdditionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "id" SERIAL NOT NULL,
    "dataSource" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exoneree_personalInfoId_key" ON "Exoneree"("personalInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Exoneree_caseInfoId_key" ON "Exoneree"("caseInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Exoneree_legalInfoId_key" ON "Exoneree"("legalInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Exoneree_wrongfulConvictionInfoId_key" ON "Exoneree"("wrongfulConvictionInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Exoneree_postExonerationInfoId_key" ON "Exoneree"("postExonerationInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Exoneree_metaDataId_key" ON "Exoneree"("metaDataId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseInfo_jurisdictionId_key" ON "CaseInfo"("jurisdictionId");

-- CreateIndex
CREATE UNIQUE INDEX "PostExonerationInfo_compensationId_key" ON "PostExonerationInfo"("compensationId");

-- CreateIndex
CREATE UNIQUE INDEX "PostExonerationInfo_currentStatusId_key" ON "PostExonerationInfo"("currentStatusId");

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_caseInfoId_fkey" FOREIGN KEY ("caseInfoId") REFERENCES "CaseInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_legalInfoId_fkey" FOREIGN KEY ("legalInfoId") REFERENCES "LegalInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_wrongfulConvictionInfoId_fkey" FOREIGN KEY ("wrongfulConvictionInfoId") REFERENCES "WrongfulConvictionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_postExonerationInfoId_fkey" FOREIGN KEY ("postExonerationInfoId") REFERENCES "PostExonerationInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exoneree" ADD CONSTRAINT "Exoneree_metaDataId_fkey" FOREIGN KEY ("metaDataId") REFERENCES "MetaData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStatus" ADD CONSTRAINT "CurrentStatus_residenceId_fkey" FOREIGN KEY ("residenceId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseInfo" ADD CONSTRAINT "CaseInfo_jurisdictionId_fkey" FOREIGN KEY ("jurisdictionId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostExonerationInfo" ADD CONSTRAINT "PostExonerationInfo_compensationId_fkey" FOREIGN KEY ("compensationId") REFERENCES "Compensation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostExonerationInfo" ADD CONSTRAINT "PostExonerationInfo_currentStatusId_fkey" FOREIGN KEY ("currentStatusId") REFERENCES "CurrentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
