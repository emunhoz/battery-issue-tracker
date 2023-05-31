/*
  Warnings:

  - The primary key for the `batteries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[timestamp]` on the table `batteries` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "batteries" DROP CONSTRAINT "batteries_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "batteries_timestamp_key" ON "batteries"("timestamp");
