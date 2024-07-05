-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('CARTED', 'ORDERED');

-- CreateEnum
CREATE TYPE "CheckoutStaus" AS ENUM ('PENDING', 'APPROVED', 'DELIVERY', 'DONE');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('DOUBLE_EXTRA_SMALL', 'EXTRA_SMALL', 'SMALL', 'MEDIUM', 'LARGE', 'EXTRALARGE', 'DOUBLELARGE', 'TRIPELARGE');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('JERSEY', 'V_NECK', 'POLO', 'TANK_TOP', 'ROUND_NECK', 'CREW_NECK', 'LONG_SLEEVE', 'RAGLAN', 'HENLEY', 'SLIM_FIT', 'OVERSIZED', 'BASKETBALL_SHORTS', 'RUNNING_SHORTS', 'CARGO_SHORTS', 'DENIM_SHORTS', 'BOARD_SHORTS', 'GYM_SHORTS', 'CHINO_SHORTS', 'SWEAT_SHORTS', 'SWIM_TRUNKS', 'SKATE_SHORTS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT,
    "address" TEXT,
    "profileImage" TEXT,
    "userType" TEXT DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "brand" TEXT,
    "size" "Size" NOT NULL,
    "color" TEXT,
    "category" "ProductCategory" NOT NULL,
    "stocks" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "CartStatus" NOT NULL DEFAULT 'CARTED',
    "productId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "checkoutId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checkout" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "proofOfPayment" TEXT,
    "deliveryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "CheckoutStaus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Order_userId_productId_id_idx" ON "Order"("userId", "productId", "id");

-- CreateIndex
CREATE INDEX "Checkout_userId_id_idx" ON "Checkout"("userId", "id");

-- CreateIndex
CREATE INDEX "Offers_name_idx" ON "Offers"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "Checkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
