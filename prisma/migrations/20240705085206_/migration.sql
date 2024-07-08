-- CreateTable
CREATE TABLE "WalkIn" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "WalkIn_pkey" PRIMARY KEY ("id")
);
