/*
  Warnings:

  - The `phoneNumber` column on the `employes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tin` column on the `employes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "employes" DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" INTEGER,
DROP COLUMN "tin",
ADD COLUMN     "tin" INTEGER;
