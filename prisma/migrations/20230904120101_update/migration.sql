/*
  Warnings:

  - Added the required column `buyerEmail` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerName` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "buyerEmail" TEXT NOT NULL,
ADD COLUMN     "buyerName" TEXT NOT NULL;
