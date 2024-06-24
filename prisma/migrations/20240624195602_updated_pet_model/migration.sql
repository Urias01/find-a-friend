/*
  Warnings:

  - Added the required column `was_adopted` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "was_adopted" BOOLEAN NOT NULL;
