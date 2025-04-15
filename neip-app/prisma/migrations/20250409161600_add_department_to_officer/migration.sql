-- AlterTable
ALTER TABLE "Officer" ALTER COLUMN "MediaLinks" DROP NOT NULL,
ALTER COLUMN "MediaLinks" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
