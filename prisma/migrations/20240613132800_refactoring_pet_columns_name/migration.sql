/*
  Warnings:

  - You are about to drop the column `energyLevel` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `independenceLevel` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `pets` table. All the data in the column will be lost.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energyLevel",
DROP COLUMN "independenceLevel",
DROP COLUMN "orgId",
ADD COLUMN     "energy_level" TEXT NOT NULL,
ADD COLUMN     "independence_level" TEXT NOT NULL,
ADD COLUMN     "org_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
