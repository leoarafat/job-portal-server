/*
  Warnings:

  - You are about to drop the column `firstName` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `employes` table. All the data in the column will be lost.
  - Added the required column `name` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `employes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "employes" DROP COLUMN "companyName",
ADD COLUMN     "name" TEXT NOT NULL;
