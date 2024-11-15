/*
  Warnings:

  - A unique constraint covering the columns `[caseNumber]` on the table `CaseInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `PersonalInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CaseInfo_caseNumber_key" ON "CaseInfo"("caseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_email_key" ON "PersonalInfo"("email");
