/*
  Warnings:

  - The primary key for the `batteries` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "batteries" DROP CONSTRAINT "batteries_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "batteries_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "batteries_id_seq";
