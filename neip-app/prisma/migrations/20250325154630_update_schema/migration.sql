/*
  Warnings:

  - You are about to drop the column `judge` on the `LegalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `officersInvolved` on the `LegalInfo` table. All the data in the column will be lost.
  - The `exonerationMethod` column on the `LegalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `otherInfo` on the `WrongfulConvictionInfo` table. All the data in the column will be lost.
  - You are about to drop the column `policeMisconduct` on the `WrongfulConvictionInfo` table. All the data in the column will be lost.
  - You are about to drop the column `prosecutorialMisconduct` on the `WrongfulConvictionInfo` table. All the data in the column will be lost.
  - You are about to drop the `Officer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfficersDropdownOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "LegalInfo" DROP COLUMN "judge",
DROP COLUMN "officersInvolved",
ADD COLUMN     "detectivesInvolved" TEXT[],
DROP COLUMN "exonerationMethod",
ADD COLUMN     "exonerationMethod" TEXT[];

-- AlterTable
ALTER TABLE "WrongfulConvictionInfo" DROP COLUMN "otherInfo",
DROP COLUMN "policeMisconduct",
DROP COLUMN "prosecutorialMisconduct",
ADD COLUMN     "policeProsecutorialMisconduct" BOOLEAN;

-- DropTable
DROP TABLE "Officer";

-- DropTable
DROP TABLE "OfficersDropdownOption";

-- CreateTable
CREATE TABLE "DetectiveDropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "DetectiveDropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetectiveDropdownOption_value_key" ON "DetectiveDropdownOption"("value");
