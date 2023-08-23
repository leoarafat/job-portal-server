/*
  Warnings:

  - The `gender` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `companyLogo` on the `employes` table. All the data in the column will be lost.
  - The `companySize` column on the `employes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `location` on the `jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Dhaka', 'Khulna', 'Chattogram', 'Barishal', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Sylhet');

-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('Small', 'Medium', 'Large');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others');

-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- AlterTable
ALTER TABLE "employes" DROP COLUMN "companyLogo",
DROP COLUMN "companySize",
ADD COLUMN     "companySize" "CompanySize";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "location",
ADD COLUMN     "location" "LocationType" NOT NULL;
