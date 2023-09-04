/*
  Warnings:

  - Added the required column `courseName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_courseId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "courseName" TEXT NOT NULL,
ADD COLUMN     "paid" BOOLEAN DEFAULT false,
ADD COLUMN     "price" INTEGER NOT NULL;
