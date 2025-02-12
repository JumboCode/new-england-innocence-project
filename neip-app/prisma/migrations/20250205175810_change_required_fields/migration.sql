/*
  Warnings:

  - The `originalCharges` column on the `LegalInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LegalInfo" DROP COLUMN "originalCharges",
ADD COLUMN     "originalCharges" TEXT[];
