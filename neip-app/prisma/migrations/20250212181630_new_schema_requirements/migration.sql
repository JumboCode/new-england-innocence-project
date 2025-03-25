/*
  Warnings:

  - You are about to drop the column `policeProsecutorialMisconduct` on the `WrongfulConvictionInfo` table. All the data in the column will be lost.
  - You are about to drop the `officerDropdownOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "CaseInfo" ADD COLUMN     "exonerationNumber" INTEGER;

-- AlterTable
ALTER TABLE "LegalInfo" ADD COLUMN     "judge" TEXT;

-- AlterTable
ALTER TABLE "WrongfulConvictionInfo" DROP COLUMN "policeProsecutorialMisconduct",
ADD COLUMN     "otherInfo" TEXT,
ADD COLUMN     "policeMisconduct" BOOLEAN,
ADD COLUMN     "prosecutorialMisconduct" BOOLEAN;

-- DropTable
DROP TABLE "officerDropdownOption";

-- CreateTable
CREATE TABLE "OfficersDropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "OfficersDropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OfficersDropdownOption_value_key" ON "OfficersDropdownOption"("value");
