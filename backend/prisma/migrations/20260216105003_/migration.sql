/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "shortCode" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_shortCode_key" ON "Organization"("shortCode");
