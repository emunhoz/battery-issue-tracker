-- CreateTable
CREATE TABLE "batteries" (
    "academyId" INTEGER NOT NULL,
    "batteryLevel" DOUBLE PRECISION NOT NULL,
    "employeeId" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batteries_pkey" PRIMARY KEY ("academyId")
);
