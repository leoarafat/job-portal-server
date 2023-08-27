/*
  Warnings:

  - The `nidNumber` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mobileNumber` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tradeLicenseNumber` column on the `employes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recruiterNumber` column on the `employes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "nidNumber",
ADD COLUMN     "nidNumber" INTEGER,
DROP COLUMN "mobileNumber",
ADD COLUMN     "mobileNumber" INTEGER;

-- AlterTable
ALTER TABLE "employes" DROP COLUMN "tradeLicenseNumber",
ADD COLUMN     "tradeLicenseNumber" INTEGER,
DROP COLUMN "recruiterNumber",
ADD COLUMN     "recruiterNumber" INTEGER;

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);
