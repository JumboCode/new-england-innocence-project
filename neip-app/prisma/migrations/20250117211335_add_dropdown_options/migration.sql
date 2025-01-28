/*
  Warnings:

  - Changed the type of `compensationDate` on the `PostExonerationInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PostExonerationInfo" DROP COLUMN "compensationDate",
ADD COLUMN     "compensationDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "DropdownOption" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "DropdownOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DropdownOption_value_key" ON "DropdownOption"("value");
