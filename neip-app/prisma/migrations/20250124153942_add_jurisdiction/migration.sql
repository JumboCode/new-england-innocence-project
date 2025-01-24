/*
  Warnings:

  - You are about to drop the column `jurisdictionId` on the `CaseInfo` table. All the data in the column will be lost.
  - Added the required column `jurisdiction` to the `CaseInfo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `compensationDate` on the `PostExonerationInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CaseInfo" DROP COLUMN "jurisdictionId",
ADD COLUMN     "jurisdiction" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostExonerationInfo" DROP COLUMN "compensationDate",
ADD COLUMN     "compensationDate" TIMESTAMP(3) NOT NULL;
