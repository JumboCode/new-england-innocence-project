/*
  Warnings:

  - The `MediaLinks` column on the `Officer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LegalInfo" ADD COLUMN     "policeDepartment" TEXT;

-- AlterTable
ALTER TABLE "Officer" DROP COLUMN "MediaLinks",
ADD COLUMN     "MediaLinks" TEXT[];
