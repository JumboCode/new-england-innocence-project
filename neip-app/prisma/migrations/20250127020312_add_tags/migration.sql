-- /*
--   Warnings:

--   - You are about to drop the column `jurisdictionId` on the `CaseInfo` table. All the data in the column will be lost.
--   - Added the required column `jurisdiction` to the `CaseInfo` table without a default value. This is not possible if the table is not empty.

-- */
-- -- AlterTable
-- ALTER TABLE "CaseInfo" DROP COLUMN "jurisdictionId",
-- ADD COLUMN     "jurisdiction" TEXT NOT NULL;
