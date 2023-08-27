/*
  Warnings:

  - The `requiredSkill` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `assessment` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverLetter` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "assessment" TEXT NOT NULL,
ADD COLUMN     "coverLetter" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "requiredSkill",
ADD COLUMN     "requiredSkill" TEXT[];
