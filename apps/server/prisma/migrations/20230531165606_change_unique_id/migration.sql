-- DropIndex
DROP INDEX "batteries_timestamp_key";

-- AlterTable
ALTER TABLE "batteries" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "batteries_pkey" PRIMARY KEY ("id");
