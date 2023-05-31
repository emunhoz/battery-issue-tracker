/*
  Warnings:

  - The primary key for the `batteries` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "batteries" DROP CONSTRAINT "batteries_pkey",
ADD CONSTRAINT "batteries_pkey" PRIMARY KEY ("employeeId");
