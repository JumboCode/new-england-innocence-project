/*
  Warnings:

  - You are about to drop the column `detectivesInvolved` on the `LegalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `policeProsecutorialMisconduct` on the `WrongfulConvictionInfo` table. All the data in the column will be lost.
  - You are about to drop the `DetectiveDropdownOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "LegalInfo" DROP COLUMN "detectivesInvolved",
ADD COLUMN     "judge" TEXT,
ADD COLUMN     "officersInvolved" TEXT[],
ALTER COLUMN "exonerationMethod" SET NOT NULL,
ALTER COLUMN "exonerationMethod" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WrongfulConvictionInfo" DROP COLUMN "policeProsecutorialMisconduct",
ADD COLUMN     "otherInfo" TEXT,
ADD COLUMN     "policeMisconduct" BOOLEAN,
ADD COLUMN     "prosecutorialMisconduct" BOOLEAN;

-- DropTable
DROP TABLE "DetectiveDropdownOption";

-- CreateTable
CREATE TABLE "OfficersDropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "OfficersDropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Officer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "MediaLinks" TEXT,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OfficersDropdownOption_value_key" ON "OfficersDropdownOption"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Officer_name_key" ON "Officer"("name");
