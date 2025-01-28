/*
  Warnings:

  - You are about to drop the `DropdownOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DropdownOption";

-- CreateTable
CREATE TABLE "ChargesDropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ChargesDropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetectiveDropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "DetectiveDropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChargesDropdownOption_value_key" ON "ChargesDropdownOption"("value");

-- CreateIndex
CREATE UNIQUE INDEX "DetectiveDropdownOption_value_key" ON "DetectiveDropdownOption"("value");
